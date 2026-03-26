/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#393D3F',
          light: '#FDFDFF',
          sage: '#C6C5B9',
          teal: '#62929E',
          slate: '#546A7B'
        },
        dark: {
          primary: '#1F1F23',
          secondary: '#2A2E33',
          accent: '#3A4451',
          text: '#F5F5F7'
        }
      },
      boxShadow: {
        'neon': '0 0 5px rgba(98, 146, 158, 0.4), 0 0 20px rgba(84, 106, 123, 0.3)',
        'neon-hover': '0 0 10px rgba(98, 146, 158, 0.6), 0 0 30px rgba(84, 106, 123, 0.4)'
      }
    },
  },
  plugins: [],
};