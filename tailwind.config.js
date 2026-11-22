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
        dark: {
          900: '#070709',
          800: '#0d0d12',
          700: '#14141d',
          600: '#1e1e2b',
          500: '#2a2a3b',
        },
        nova: {
          purple: {
            light: '#c084fc',
            DEFAULT: '#8b5cf6',
            hover: '#7c3aed',
            dark: '#581c87',
            glow: '#a855f7',
          },
          white: '#ffffff',
          muted: '#94a3b8',
        }
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-purple-lg': '0 0 45px -5px rgba(168, 85, 247, 0.5)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
