/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 7s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.15' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        'bounce-sm': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      fontSize: {
        'xxs': '0.65rem',
      },
      transformOrigin: {
        '0': '0%',
      },
      scale: {
        '98': '.98',
        '102': '1.02',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};