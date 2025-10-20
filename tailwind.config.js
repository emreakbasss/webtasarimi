/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: '#52100d',
        grayx: '#c0c0c0',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: { lg: '1120px' }
      },
      boxShadow: {
        header: '0 10px 30px rgba(0,0,0,.06)'
      }
    }
  },
  plugins: []
}


