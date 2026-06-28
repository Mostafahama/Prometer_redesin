/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'prometer-dark':  '#110321',
        'prometer-mint':  '#CAE3DE',
        'prometer-neon':  '#A537FB',
        'prometer-deep':  '#0A0118',
        'prometer-card':  '#1A0830',
        'prometer-cyan':  '#06B6D4',
        'prometer-green': '#10B981',
        'prometer-amber': '#F59E0B',
        'prometer-pink':  '#EC4899',
      },
      fontFamily: {
        heading: ['Zanjabeel', 'Cairo', 'Tajawal', 'sans-serif'],
        body:    ['Palestine', 'Cairo', 'Tajawal', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon':      '0 0 20px rgba(165,55,251,0.4), 0 0 60px rgba(165,55,251,0.2)',
        'neon-sm':   '0 0 10px rgba(165,55,251,0.3)',
        'neon-lg':   '0 0 40px rgba(165,55,251,0.5), 0 0 100px rgba(165,55,251,0.25)',
        'card':      '0 25px 80px rgba(0,0,0,0.4)',
        'glass':     '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(202,227,222,0.05)',
      },
      backgroundImage: {
        'neon-grad':   'linear-gradient(135deg, #A537FB 0%, #7C3AED 100%)',
        'dark-grad':   'linear-gradient(180deg, #110321 0%, #0A0118 100%)',
        'card-grad':   'linear-gradient(135deg, rgba(165,55,251,0.15) 0%, rgba(17,3,33,0.8) 100%)',
        'hero-radial': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(165,55,251,0.25) 0%, transparent 60%)',
      },
      keyframes: {
        'marquee-ltr': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-33.333%)' } },
        'marquee-rtl': { '0%': { transform: 'translateX(-33.333%)' }, '100%': { transform: 'translateX(0)' } },
        'float':       { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        'orbit':       { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        'pulse-neon':  { '0%,100%': { boxShadow: '0 0 20px rgba(165,55,251,0.4)' }, '50%': { boxShadow: '0 0 40px rgba(165,55,251,0.8)' } },
        'shimmer':     { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'count-up':    { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'marquee-ltr': 'marquee-ltr 30s linear infinite',
        'marquee-rtl': 'marquee-rtl 30s linear infinite',
        'float':       'float 4s ease-in-out infinite',
        'orbit':       'orbit 20s linear infinite',
        'pulse-neon':  'pulse-neon 2s ease-in-out infinite',
        'shimmer':     'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
