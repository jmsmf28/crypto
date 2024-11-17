/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure to scan all relevant files for Tailwind classes
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu bold', 'sans-serif'], // Custom font
      },
      colors: {
        'custom-blue': '#1E5891', // Custom color (optional)
      },
    },
  },
  plugins: [],
}
