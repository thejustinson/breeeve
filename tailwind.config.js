/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#2B2942',
        foreground: '#939FB4',
        heading: '#FFFFFF',
        accent: '#382261',
        'accent-text': '#A390F5',
        'gradient-start': '#3D3B6A',
      },
    },
  },
  plugins: [],
} 