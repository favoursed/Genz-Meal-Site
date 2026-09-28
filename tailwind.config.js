/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/App.vue"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#01472e',
          50: '#edf7f2',
          100: '#d5eee0',
          200: '#aedcc4',
          300: '#7bc3a2',
          400: '#4ca47f',
          500: '#2d8763',
          600: '#1f6c4e',
          700: '#19563f',
          800: '#154533',
          900: '#01472e',
        },
        sage: {
          DEFAULT: '#ccd5ae',
          light: '#dbe2c4',
          dark: '#b9c397',
        },
        olive: {
          DEFAULT: '#e9edc9',
          light: '#f2f5da',
          dark: '#dce1b3',
        },
        cream: {
          DEFAULT: '#fefae0',
          light: '#fffdf0',
          dark: '#f6f0c7',
        },
        moss: {
          DEFAULT: '#a3b18a',
          light: '#b6c2a1',
          dark: '#8f9f75',
        },
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'forest': '0 25px 50px -12px rgba(1, 71, 46, 0.18)',
        'forest-sm': '0 4px 20px -2px rgba(1, 71, 46, 0.08)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
