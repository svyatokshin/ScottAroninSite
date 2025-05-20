/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Zen-inspired color palette
        'zen-blue': {
          light: '#7FB3D5',  // Calming light blue
          DEFAULT: '#4A90E2', // Peaceful medium blue
          dark: '#2C5282',   // Deep contemplative blue
        },
        'zen-purple': {
          light: '#B8A7EA',  // Soft lavender
          DEFAULT: '#9B6B9E', // Gentle purple
          dark: '#6B4E71',   // Deep purple
        },
        'zen-yellow': {
          light: '#FFE5A3',  // Warm sunshine
          DEFAULT: '#FFD166', // Bright yellow
          dark: '#E6B800',   // Golden
        },
        'zen-red': {
          light: '#FF9B9B',  // Soft coral
          DEFAULT: '#FF6B6B', // Warm red
          dark: '#C53030',   // Deep red
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 1.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'breath': 'breath 4s ease-in-out infinite',
        'ripple': 'ripple 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'sway': 'sway 8s ease-in-out infinite',
        'zen-fade': 'zenFade 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        breath: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '0.4' },
          '100%': { transform: 'scale(1)', opacity: '0.8' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(74, 144, 226, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(74, 144, 226, 0.8)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        zenFade: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'zen-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'zen-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 