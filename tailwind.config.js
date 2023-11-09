/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      width: {
        page: "970px",
      },
      colors: {
        primary: "#232E52",
        secondary: "#EBF2FE",
        opacity_bg: "rgba(0,0,0,0.4)",
      },
      padding: {
        page: "9rem",
      },
    },
  },
  plugins: [],
};
