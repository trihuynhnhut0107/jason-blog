/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Roboto", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      colors: {
        "red-text": "#cf2e2e",
      },
    },
  },
  plugins: [],
};
