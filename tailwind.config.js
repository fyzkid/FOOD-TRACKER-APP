/** @type {import('tailwindcss').Config} */

const config = {
  content: ['./src/**/**/*.{js,jsx,ts,tsx}', './public/*.html'],
  theme: {
    extend: {
      colors: {
        primary: "#10B981",
        secondary: "#065F46",
        text: "#333333",
        background: "#D1FAE5",
      },
    },
  },
  plugins: [],
};

export default config;
