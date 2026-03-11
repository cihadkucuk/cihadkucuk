import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");
app.set("trust proxy", 1);

app.use(express.json({ limit: "200kb" }));

const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 60_000);
const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5);
const CONTACT_ALLOWED_ORIGINS = String(process.env.CONTACT_ALLOWED_ORIGINS || "")
  .split(",")
  .map((entry) => entry.trim())
  .filter(Boolean);
const requestBuckets = new Map();

function cleanOldBuckets(now) {
  for (const [key, bucket] of requestBuckets.entries()) {
    if (now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
      requestBuckets.delete(key);
    }
  }
}

function isRateLimited(ip) {
  const now = Date.now();
  cleanOldBuckets(now);

  const bucket = requestBuckets.get(ip);
  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    requestBuckets.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  bucket.count += 1;
  requestBuckets.set(ip, bucket);
  return bucket.count > RATE_LIMIT_MAX;
}

function getClientIp(req) {
  return req.ip || "unknown";
}

function isAllowedOrigin(req) {
  if (CONTACT_ALLOWED_ORIGINS.length === 0) {
    return true;
  }
  const origin = String(req.headers.origin || "").trim();
  if (!origin) {
    return false;
  }
  return CONTACT_ALLOWED_ORIGINS.includes(origin);
}

function normalizeField(value, maxLength) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendToTelegram(payload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return {
      ok: false,
      status: 500,
      error: "Telegram integration is not configured.",
    };
  }

  const telegramPayload = {
    chat_id: chatId,
    text: payload.text,
    disable_web_page_preview: true,
  };

  const threadIdRaw = process.env.TELEGRAM_MESSAGE_THREAD_ID;
  if (threadIdRaw) {
    const threadId = Number(threadIdRaw);
    if (Number.isInteger(threadId)) {
      telegramPayload.message_thread_id = threadId;
    }
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(telegramPayload),
  });

  if (!response.ok) {
    const responseText = await response.text();
    console.error("Telegram API HTTP error", response.status, responseText);
    return {
      ok: false,
      status: 502,
      error: "Failed to deliver message to Telegram.",
    };
  }

  const data = await response.json();
  if (!data?.ok) {
    console.error("Telegram API response error", data);
    return {
      ok: false,
      status: 502,
      error: "Telegram rejected the message.",
    };
  }

  return { ok: true, status: 200 };
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    if (!isAllowedOrigin(req)) {
      return res.status(403).json({
        ok: false,
        error: "Request origin is not allowed.",
      });
    }

    const honeypot = normalizeField(req.body?.website, 200);
    if (honeypot) {
      return res.status(200).json({ ok: true });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return res.status(429).json({
        ok: false,
        error: "Too many requests. Please try again shortly.",
      });
    }

    const name = normalizeField(req.body?.name, 120);
    const email = normalizeField(req.body?.email, 160);
    const businessReference = normalizeField(req.body?.businessReference, 240);
    const subject = normalizeField(req.body?.subject, 180);
    const message = normalizeField(req.body?.message, 4000);
    const language = normalizeField(req.body?.language, 10).toUpperCase();

    if (!name || !email || !businessReference || !message) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        ok: false,
        error: "Invalid email format.",
      });
    }

    const nowUtc = new Date().toISOString();
    const telegramMessage = [
      "New Website Contact Form Submission",
      `Time (UTC): ${nowUtc}`,
      `Language: ${language || "N/A"}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Business Reference: ${businessReference}`,
      `Subject: ${subject || "-"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const sendResult = await sendToTelegram({ text: telegramMessage });
    if (!sendResult.ok) {
      return res.status(sendResult.status).json({
        ok: false,
        error: sendResult.error,
      });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error("Contact endpoint error", error);
    return res.status(500).json({
      ok: false,
      error: "Unexpected server error.",
    });
  }
});

app.use(express.static(distPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOSTNAME || "0.0.0.0";
app.listen(port, host, () => {
  console.log(`Cihad Kucuk app listening on ${host}:${port}`);
});
