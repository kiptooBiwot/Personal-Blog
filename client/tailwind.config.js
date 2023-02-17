/** @type {import('tailwindcss').Config} */

const FormKitVariants = require('@formkit/themes/tailwindcss')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Comfortaa'],
        display: ['Garamond'],
        // body: ['Source Serif Pro'],
        // body: ['Red Hat Text'],
        body: ['Outfit'],
        sans: ['Arial']
      }
    },
  },
  plugins: [],
}
