import React from "react";

function joinClasses(...parts) {
  return parts.filter(Boolean).join(" ");
}

const variantClass = {
  default: "bg-teal-900 text-teal-50 hover:bg-teal-800",
  outline: "border border-teal-900/20 bg-[#fff8ee] text-teal-950 hover:bg-[#f1e4cf]"
};

export function Button({
  className = "",
  variant = "default",
  type = "button",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={joinClasses(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b87333]/35 disabled:pointer-events-none disabled:opacity-50",
        variantClass[variant] || variantClass.default,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
