/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  // daisyuiを呼び出す
  plugins: [require('daisyui')],
}
