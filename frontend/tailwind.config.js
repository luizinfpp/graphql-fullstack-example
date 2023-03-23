/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'c-dark' : '#151414',
        'c-h-dark' : '#2b2b2b',
        'c-light' : '#fcf7f8',
        'c-min-light': '#ced3dc',
        'c-h-blue' : '#2d6bc8',
        'c-hl-blue' : '#4ea4c7'
      }
    },
  },
  plugins: [],
}