/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'body':'#DFDFDF',
        'dark':'#212121',
        'accent':'#D83E3E',
      },

      gridTemplateColumns:{
        'about': '3fr 2fr',
        'capmobile':'1fr 6fr 1fr',
        'capdesktop':'1fr 4fr 4fr 1fr'
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
