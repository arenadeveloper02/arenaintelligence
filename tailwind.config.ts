import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#04050F',
        surface: '#0A0F1F',
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#22D3EE',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
      },
      boxShadow: {
        glow: '0 0 30px rgba(99, 102, 241, 0.12)',
        'glow-lg': '0 20px 50px rgba(99, 102, 241, 0.22)',
        'glow-xl': '0 30px 80px rgba(99, 102, 241, 0.28)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
