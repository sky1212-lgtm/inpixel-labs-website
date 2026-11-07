/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          primary: '#8E4BEB',
        },
        blue: {
          primary: '#4755E9',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #8E4BEB, #4755E9)',
        'brand-gradient-r': 'linear-gradient(to right, #8E4BEB, #4755E9)',
      },
    },
  },
  plugins: [],
}
