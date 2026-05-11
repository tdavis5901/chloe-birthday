/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(225, 87, 132, 0.22)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 5s linear infinite',
        drift: 'drift 15s linear infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 20px, 0) rotate(0deg)', opacity: '0' },
          '12%': { opacity: '0.7' },
          '88%': { opacity: '0.7' },
          '100%': { transform: 'translate3d(36px, -120vh, 0) rotate(34deg)', opacity: '0' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.04)', opacity: '0.82' },
        },
      },
    },
  },
  plugins: [],
};
