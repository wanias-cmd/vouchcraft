/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0B0F19",
        cardBg: "#161E2E",
        accentBlue: "#3B82F6",
        accentGlow: "#6366F1"
      }
    },
  },
  plugins: [],
}