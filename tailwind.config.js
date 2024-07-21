/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
          'hero-pattern':"url('./backgroundpaper.png')",
      },
      backgroundColor: {
        'custom-blue': 'rgb(103, 145, 200)',
      },
    },
  },
  plugins: [],
}

