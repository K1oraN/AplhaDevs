/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    
      colors: {
        'primary-dark': '#0c0c0e',
        'card-dark': 'rgba(26, 26, 29, 0.6)',
        'primary-red': {
          400: '#ef4444',
          500: '#dc2626',
          600: '#c00f0f',
          700: '#9a0c0c',
        },
      },

      animation: {
        'subtle-gradient': 'subtle-gradient 15s ease infinite',
        'pulse-btn': 'pulse 2s infinite',
      },
      keyframes: {
        'subtle-gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(220, 38, 38, 0)' },
        },
      },
    },
  },
  plugins: [],
}