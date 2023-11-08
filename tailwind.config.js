/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "node_modules/preline/dist/*.js",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: [
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
          ],
        },
      },
    },
    plugins: [
      require('preline/plugin'),
    ],
}