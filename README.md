# DOC Studios Founder Landing Page

This project is prepared for Dokploy deployment with:
- React frontend build (`dist`)
- Node/Express runtime server (`server.js`)
- Telegram contact form delivery via Bot API

## Local development

```bash
npm install
npm run dev
```

Note: `npm run dev` runs only Vite frontend. For full contact form delivery, run the production server flow below.

## Production run (local)

```bash
npm run build
npm run start
```

Server runs on `PORT` (default `3000`).

## Required environment variables

- `TELEGRAM_BOT_TOKEN`: Bot token from BotFather
- `TELEGRAM_CHAT_ID`: Telegram channel/group ID (for channels usually `-100...`)
- You can copy `.env.example` as a template when configuring values.

## Optional environment variables

- `TELEGRAM_MESSAGE_THREAD_ID`: Topic/thread ID if using Telegram forum topics
- `VITE_API_BASE_URL`: Optional frontend override (useful only if API is hosted on another origin)
- `CONTACT_RATE_LIMIT_WINDOW_MS`: Rate-limit window in milliseconds (default `60000`)
- `CONTACT_RATE_LIMIT_MAX`: Max requests per IP per window (default `5`)
- `PORT`: HTTP server port (default `3000`)

## Dokploy deployment

1. Create a new project in Dokploy from this repository.
2. Use `Dockerfile` build strategy.
3. Set exposed container port to `3000`.
4. Add environment variables:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - optional `TELEGRAM_MESSAGE_THREAD_ID`
5. Deploy.

## Telegram setup checklist

1. Create bot in BotFather and copy token.
2. Add bot to your target channel/group.
3. Give bot permission to post messages.
4. Use the correct `TELEGRAM_CHAT_ID`.
