/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        'spacing-right': 'calc(100% - 380px)',
      },
      colors: {
        main: '#2F2F33',
        input: '#62626C',
      },
    },
  },
  plugins: [],
};
