/** @type {import('tailwindcss').Config} */
const brandColors = {
  primary: '#2F80ED',
  secondary: '#6C5DD3',
  accent: '#F2994A'
};

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: brandColors,
        surface: '#0A0A10'
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
