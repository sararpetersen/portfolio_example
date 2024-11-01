/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "site-black": "#000000",
        "site-dark-gray": "#1e1e1e",
        "site-gray": "#4a4a4a",
        "site-light-gray": "#b3b3b3",
        "site-red": "#ff3333",
      },
    },
    fontFamily: {
      almarai: ["Almarai", "sans-serif"],
      exo: ["Exo", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};
