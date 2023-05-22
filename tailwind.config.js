/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.{js,jsx,ts,tsx}',
    './src/**/**/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      primary: '#81D8F7',
      secondary: '#7C7C8A',
      black: {
        900: '#000000',
        600: '#202024',
      },
      white: '#FFFFFF',
      gray: {
        50: '#EEEEEE',
        100: '#E1E1E6',
      },
      red: '#ff0000',
    },
    extend: {},
  },
  plugins: [],
};
