/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e4d3b",
        "primary-dark": "#163829",
      },
      fontFamily: {
        sans: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
