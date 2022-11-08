/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/common/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        thfBlue: '#1200FF',
        thfOrange: '#FF6314',
        thfDarkBlue: '#160949',
      },
    },
  },
  plugins: [],
};
