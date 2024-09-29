/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1.5s forwards',
      },
    },
  },
  variants: {
    extend: {
      animation: ['responsive', 'group-hover', 'hover', 'focus', 'motion-safe'],
    },
  },
  plugins: [],
}

