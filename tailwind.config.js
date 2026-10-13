/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0a0a',
        gold: {
          light: '#f3e5ab',
          DEFAULT: '#d4af37',
          dark: '#b8860b',
        },
        crimson: {
          DEFAULT: '#8b0000',
          bright: '#dc143c',
        },
        ivory: '#fffff0',
      },
      fontFamily: {
        cinematic: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'spin-reverse-slow': 'spin-reverse 40s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, textShadow: '0 0 10px rgba(212, 175, 55, 0.5)' },
          '50%': { opacity: .7, textShadow: '0 0 20px rgba(212, 175, 55, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
