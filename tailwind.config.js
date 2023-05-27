/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'black_bg': '#273746',
        'red': '#C0392B',
        'red_hover': '#EC7063 '
      }
    },
  },
  plugins: [],
}

