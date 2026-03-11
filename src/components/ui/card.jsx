import React from "react";

function joinClasses(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function Card({ className = "", children }) {
  return <div className={joinClasses("rounded-2xl border border-teal-900/15 bg-[#fffaf2]", className)}>{children}</div>;
}

export function CardContent({ className = "", children }) {
  return <div className={joinClasses("p-6", className)}>{children}</div>;
}
