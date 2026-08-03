/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        surface: '#ffffff',
        'surface-card': '#ffffff',
        border: '#e2e8f0',
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          cyan: '#0284c7',
          accent: '#db2777',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-indigo': '0 4px 20px -2px rgba(79, 70, 229, 0.15)',
        'glow-cyan': '0 4px 20px -2px rgba(2, 132, 199, 0.15)',
        'glass': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
