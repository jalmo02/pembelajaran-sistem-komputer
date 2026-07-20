/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
          dark: '#5B21B6',
        },
        background: {
          DEFAULT: '#1E1B4B',
          secondary: '#2D2A6E',
          card: '#13113A',
        },
        accent: '#A78BFA',
      },
      fontFamily: {
        game: ['Orbitron', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}