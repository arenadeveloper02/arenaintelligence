import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#04050F',
        surface: {
          DEFAULT: '#0A0F1F',
          dark: '#0F1528',
          deep: '#141B31',
        },
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#22D3EE',
        glow: '#4F46E5',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
      },
      boxShadow: {
        glow: '0 0 30px rgba(99, 102, 241, 0.12)',
        'glow-lg': '0 20px 50px rgba(99, 102, 241, 0.22)',
        'glow-xl': '0 30px 80px rgba(99, 102, 241, 0.28)',
        'glow-btn': '0 0 25px rgba(99, 102, 241, 0.5)',
        'glow-cyan': '0 0 30px rgba(34, 211, 238, 0.18)',
      },
      borderRadius: {
        '4xl': '32px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
