import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)'],
        serif: ['var(--font-cormorant)'],
        playfair: ['var(--font-playfair)'],
      },
      colors: {
        zen: {
          blue: {
            light: '#E6F3FF',
            DEFAULT: '#4A90E2',
            dark: '#2C5282',
          },
          purple: {
            light: '#F3E6FF',
            DEFAULT: '#9B51E0',
            dark: '#6B46C1',
          },
          yellow: {
            light: '#FFF9E6',
            DEFAULT: '#F6E05E',
            dark: '#D69E2E',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 8s ease-in-out infinite',
        'zen-fade': 'zenFade 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        ripple: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '0.3' },
        },
        zenFade: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'zen-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config; 