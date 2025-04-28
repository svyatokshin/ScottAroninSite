/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1E2A3F',
        'custom-blue-light': '#2E3F62',
        'custom-blue-lighter': '#3B4F7A',
      },
    },
  },
  plugins: [],
} 