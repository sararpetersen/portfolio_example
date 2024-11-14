/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      red: {
        50: "#FBEAEA",
        100: "#F6D5D5",
        200: "#EDABAB",
        300: "#E48181",
        400: "#DB5757",
        500: "#D3302F",
        600: "#A82424",
        700: "#7E1B1B",
        800: "#541212",
        900: "#2A0909",
        950: "#150404",
      },
      blue: {
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
        950: "#030712",
      },
      grey: {
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FCFCFC",
        300: "#FCFCFC",
        400: "#FAFAFA",
        500: "#F9F9F9",
        600: "#C7C7C7",
        700: "#969696",
        800: "#636363",
        900: "#333333",
        950: "#1A1A1A",
      },
    },

    fontFamily: {
      almarai: ["Almarai", "sans-serif"],
      exo: ["Exo", "sans-serif"],
    },
  },
  extend: {},

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};
