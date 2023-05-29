/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ad20c9",
        secondary: "#e60e84",
        'dark-600': '#222',
        'dark-200': '#e5e7eb',
        'dark-100': '#f5f6f7',
        'purple-600': '#8e24aa',
        'yellow-600': '#f9d13e',
      },
      fontFamily: {
        Poppins: ['Poppins, sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: '1125px',
          xl: '1920px',
          '2xl': '2560px',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
