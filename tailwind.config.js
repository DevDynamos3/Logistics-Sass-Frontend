/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Fleetra Brand Colors (Blue-focused)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Main brand blue
          600: '#2563eb',
          700: '#1d4ed8',  // Dark blue for headers
          800: '#1e40af',
          900: '#1e3a8a',  // Deep blue
        },
        // Status colors for drivers
        status: {
          available: '#10b981',  // Green
          busy: '#f59e0b',       // Amber
          offline: '#6b7280',    // Gray
          enroute: '#3b82f6',    // Blue
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)', // For iOS safe areas
      },
    },
  },
  plugins: [],
}