/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 

module.exports = withMT({
  
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "node_modules/preline/dist/*.js",
      "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
      "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: [
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
          ],
        },
        // colors: {
        //   sky: {
        //     50: "#f0f9ff",
        //     100: "#e0f2fe",
        //     200: "#bae6fd",
        //     300: "#7dd3fc",
        //     400: "#38bdf8",
        //     500: "#0ea5e9",
        //     600: "#0284c7",
        //     700: "#0369a1",
        //     800: "#075985",
        //     900: "#0c4a6e",
        //   }
        // }
      },
    },
    plugins: [
      require('preline/plugin'),
      require('@tailwindcss/forms'),
    ],
})