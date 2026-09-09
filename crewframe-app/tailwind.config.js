/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        orange: {
          DEFAULT: "#f36a2d",
          dk: "#d9531a",
        },
        charcoal: "#15191d",
        stone: "#e8e5df",
        paper: "#fafaf8",
      },
      fontFamily: {
        display: [
          "Barlow Condensed",
          "Oswald",
          "Arial Narrow",
          "Roboto Condensed",
          "Helvetica Neue Condensed",
          "DejaVu Sans Condensed",
          "sans-serif",
        ],
        body: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      maxWidth: {
        container: "1240px",
      },
    },
  },
  plugins: [],
};
