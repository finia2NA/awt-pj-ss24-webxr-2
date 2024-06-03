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
        mainBG: "rgba(240, 240, 240, 0.7)",
        primary: '#000000',
        highlight: '#26B5EA',
        buttonBG: '#EEEEEE',
        uiElem: 'rgba(210, 210, 210, 0.61)',
        moreOpaqueUIElem: 'rgba(210, 210, 210, 0.8)',
        darkerUIElem: 'rgba(150, 150, 150, 0.6)',
        dark: {
          mainBG: 'rgba(4, 4, 4, 0.7)',
          primary: '#FFFFFF',
          buttonBG: '#444444',
          uiElem: 'rgba(115, 115, 115, 0.61)',
          moreOpaqueUIElem: 'rgba(115, 115, 115, 0.8)',
          darkerUIElem: 'rgba(150, 150, 150, 0.6)', // TODO: This needs to be changed for the dark mode but that needs testing
        },
      },
      keyframes: {
        appear: {
           "0%": {
              opacity: "0",
           },
           "100%": {
              opacity: "1",
           },
        },
      },
    },
    plugins: [],
  }
} // Add this closing curly brace

