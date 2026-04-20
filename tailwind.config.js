/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#e0eaff",
          500: "#1D4ED8",
          600: "#1E40AF",
          700: "#1e3a8a",
          900: "#0F172A",
        },
        accent: {
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
        danger: {
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
        },
        warn: {
          400: "#FBBF24",
          500: "#F59E0B",
        },
      },
    },
  },
  plugins: [],
};
