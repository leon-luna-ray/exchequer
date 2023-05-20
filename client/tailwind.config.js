/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2.5rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '1200px',
        },
      },
    },
  },
  plugins: [],
}

