/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        mainBG: "rgba(204, 204, 204, 0.7)",
        primary: '#000000',
        highlight: '#26B5EA',
        buttonBG: '#EEEEEE',
        uiElem: 'rgba(240, 240, 240, 0.61)',
        dark: {
          mainBG: 'rgba(4, 4, 4, 0.7)',
          primary: '#FFFFFF',
          buttonBG: '#444444',
          uiElem: 'rgba(115, 115, 115, 0.61)',
        }
      },
    },
    plugins: [],
  }
} // Add this closing curly brace

