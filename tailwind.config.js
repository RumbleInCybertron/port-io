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
      animation: {
        'gradient-x':'gradient-x 15s ease infinite',
        'gradient-y':'gradient-y 15s ease infinite',
        'gradient-xy':'gradient-xy 15s ease infinite'
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size':'400% 400%',
            'background-position':'center top'
          },
          '50%': {
            'background-size':'400% 400%',
            'background-position':'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size':'200% 200%',
            'background-position':'left center'
          },
          '50%': {
            'background-size':'200% 200%',
            'background-position':'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size':'400% 400%',
            'background-position':'left center'
          },
          '50%': {
            'background-size':'200% 200%',
            'background-position':'right center'
          }
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
};
