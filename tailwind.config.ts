import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#050816',
        surface: {
          DEFAULT: '#0B1120',
          dark: '#111827',
          deep: '#151A2D',
        },
        primary: '#6366F1',
        secondary: '#8B5CF6',
        glow: '#4F46E5',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
      },
      boxShadow: {
        glow: '0 0 30px rgba(99, 102, 241, 0.12)',
        'glow-lg': '0 15px 40px rgba(99, 102, 241, 0.20)',
        'glow-btn': '0 0 25px rgba(99, 102, 241, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
