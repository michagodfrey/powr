/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      primary: "#e8772e",
      primaryHover: "#f4bb97",
      secondary: "#001f3f",
      secondaryHover: "#334c65",
      warning: "#DC143C",
      warningHover: "#e34363",
      white: "#ffffff",
      black: "#000000",
      textColor: "#212f3d",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
