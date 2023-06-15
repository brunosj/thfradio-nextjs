/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/common/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        lg: '1080px',
        // => @media (min-width: 992px) { ... }
      },
      fontFamily: {
        sans: ['NeueMachina'],
        mono: ['SpaceMono'],
      },
      colors: {
        blue: {
          100: '#d0ccff',
          200: '#a099ff',
          300: '#7166ff',
          400: '#4133ff',
          500: '#1200ff',
          600: '#0e00cc',
          700: '#0b0099',
          800: '#070066',
          900: '#040033',
        },

        orange: {
          100: '#ffe0d0',
          200: '#ffc1a1',
          300: '#ffa172',
          400: '#ff8243',
          500: '#ff6314',
          600: '#cc4f10',
          700: '#993b0c',
          800: '#662808',
          900: '#331404',
        },
      },
    },
  },
  plugins: [],
};
