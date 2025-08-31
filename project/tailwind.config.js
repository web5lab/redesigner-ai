/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        slate: {
          800: '#1E293B',
          900: '#0F172A',
        },
        indigo: {
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
        },
        purple: {
          400: '#C084FC',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
      },
      boxShadow: {
        glow: '0 0 15px 0 rgba(99, 102, 241, 0.4)',
      },
    },
  },
  plugins: [],
};