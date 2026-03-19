/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      blue: {
        50: "#f2f8f9",
        100: "#deebef",
        200: "#c0d7e1",
        300: "#95bccb",
        400: "#6297ae",
        500: "#477b93",
        600: "#3e657c",
        700: "#375567",
        800: "#334857",
        900: "#2f3f4c",
        950: "#1b2731",
      },
      pale: {
        50: "#FFFDFC",
        100: "#F7F3EF", // main background
        200: "#EFEAE5",
        300: "#E4DED8",
        400: "#D6CEC6",
        500: "#C4BBB2",
        600: "#A89F97",
        700: "#8C847D",
        800: "#6F6862",
        900: "#57514C",
        950: "#2e2a27",
      },
      red: {
        50: "#fdf2f2",
        100: "#fce7e7",
        200: "#f9d0d0",
        300: "#f4a6a6",
        400: "#ec6b6b",
        500: "#E63946", // primary accent
        600: "#c5303c",
        700: "#a32932",
        800: "#84242a",
        900: "#6d1f24",
        950: "#3a0e11",
      },
      green: {
        50: "#f0fdf5",
        100: "#dcfce8",
        200: "#bbf7d1",
        300: "#86efad",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803c",
        800: "#166533",
        900: "#14532b",
        950: "#052e14",
      },
      gray: {
        50: "#f7f3ef", // soft background tint (optional)
        100: "#f0ebe6",
        200: "#dcd6d0",
        300: "#bfb7b0",
        400: "#8f8882",
        500: "#6B7280", // mist (secondary text)
        600: "#4b4b4b",
        700: "#2e2e2e",
        800: "#1F1F1F", // main text (ink)
        900: "#121212",
        950: "#0a0a0a",
      },
    },

    fontFamily: {
      hiro: ["Zen Old Mincho", "serif"],
      inter: ["Inter", "sans-serif"],
      almarai: ["Almarai", "sans-serif"],
    },

    fontSize: {
      "display-desktop": ["5.8rem", { lineHeight: "5.5rem" }],
      "display-mobile": ["3.7rem", { lineHeight: "3.5rem" }],
      "h1-desktop": ["4.6rem", { lineHeight: "3.75rem" }],
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
      drop25: "1px 1px 14px 2px rgba(0,0,0,0.43)",
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
