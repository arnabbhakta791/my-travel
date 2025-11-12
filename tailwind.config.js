/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Travel-inspired color palette
        travel: {
          blue: {
            dark: '#1e3a8a',
            base: '#3b82f6',
            light: '#60a5fa',
          },
          green: {
            dark: '#065f46',
            base: '#10b981',
            light: '#34d399',
          },
          earth: {
            dark: '#78350f',
            base: '#d97706',
            light: '#f59e0b',
          },
        },
      },
    },
  },
  plugins: [],
}

