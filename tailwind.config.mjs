/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      blue: {
        50: "#f0faff",
        100: "#e0f5fe",
        200: "#bae8fd",
        300: "#7dd5fc",
        400: "#38bcf8",
        500: "#0ea5e9",
        600: "#028ac7",
        700: "#0370a1",
        800: "#075e85",
        900: "#0c506e",
        950: "#083549",
      },
      gray: {
        50: "#f6f6f6",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#888888",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#4f4f4f",
        800: "#454545",
        900: "#3d3d3d",
        950: "#1d1d1d",
      },
    },

    fontFamily: {
      tahoma: ["Tahoma", "sans-serif"],
      helvetica: ["Helvetica", "sans-serif"],
      almarai: ["Almarai", "sans-serif"],
    },

    fontSize: {
      "display-desktop": ["6.5rem", { lineHeight: "5.5rem" }],
      "display-mobile": ["3.9rem", { lineHeight: "3.5rem" }],
      "h1-desktop": ["4.8rem", { lineHeight: "3.75rem" }],
      "h1-mobile": ["3.5rem", { lineHeight: "3.75rem" }],
      "h2-desktop": ["3rem", { lineHeight: "3.75rem" }],
      "h2-mobile": ["2.5rem", { lineHeight: "2.5rem" }],
      "h3-desktop": ["2.3rem", { lineHeight: "2.5rem" }],
      "h3-mobile": ["2rem", { lineHeight: "2.25rem" }],
      "h4-desktop": ["1.8rem", { lineHeight: "2.25rem" }],
      "h4-mobile": ["1.4rem", { lineHeight: "1.875rem" }],
      "p-desktop": ["1rem", { lineHeight: "1.875rem" }],
      "p-mobile": ["1rem", { lineHeight: "1.5rem" }],
      "a-desktop": ["1.100rem", { lineHeight: "1.875rem" }],
      "a-mobile": ["1rem", { lineHeight: "1.5rem" }],
    },
    fontWeight: {
      light: "300",
      regular: "400",
      semibold: "600",
      bold: "700",
      black: "900",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      2: "2px",
      3: "3px",
      4: "4px",
    },
    borderRadius: {
      DEFAULT: "1.25rem",
      none: "0px",
      s: "5px",
      sm: "10px",
      m: "15px",
      md: "30px",
      lg: "40px",
      full: "9999px",
    },
    boxShadow: {
      drop25: "4px 4px 4px 0 rgb(0 0 0 / 0.25)",
      drop50: "4px 4px 4px 0 rgb(0 0 0 / 0.50)",
      inner25: "0 4px 4px 0 rgb(0 0 0 / 0.25) inset",
      inner50: "0 4px 4px 0 rgb(0 0 0 / 0.50) inset",
    },

    extend: {
      spacing: {
        gap: "25px",
        "mobil-bottom": "85px",
        "desktop-bottom": "90px",
        "mobil-top": "85px",
        "desktop-top": "90px",
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};
