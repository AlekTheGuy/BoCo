module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      primary: {
        light: "#306EC1",
        medium: "#004aad",
        dark: "#002B66",
      },
      secondary: "#ff5a5f",
      error: {
        light: "#EF4444",
        medium: "#DC2626",
        dark: "#B91C1C",
      },
      warn: {
        light: "#FDE047",
        medium: "#FACC15",
        dark: "#EAB308",
      },
      success: {
        light: "#22C55E",
        medium: "#16A34A",
        dark: "#15803D",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
