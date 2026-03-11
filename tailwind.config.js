/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#fff8ee",
          100: "#f3e8d4",
          200: "#dfcda8",
          300: "#c9b184",
          400: "#a88a61",
          500: "#b87333",
          600: "#8f5e2d",
          700: "#2f5d46",
          800: "#254a37",
          900: "#1b3a2a",
          950: "#0f2419"
        }
      }
    }
  },
  plugins: []
};
