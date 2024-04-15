/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f28500",
        "primary-500": "#ffa40a",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
