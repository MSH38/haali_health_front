/** @type {import('tailwindcss').Config} */

/**
 * Palette derived from the official HAALI logo.
 * Sampled exactly: #5170FF (periwinkle blue) → #00FFA2 (spring green).
 *
 * Both scales are generated at the logo's own hues — blue H=229, green H=158 —
 * so every tint and shade stays on-brand rather than drifting to a generic navy.
 *
 * Contrast (vs white) is noted per step. Anything below 4.5 is UI/large-text
 * only, never small body copy.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Blue scale — H=229. `navy-500` is the exact logo blue.
        navy: {
          50: '#F0F3FF', //  1.11
          100: '#E0E6FF', //  1.24
          200: '#C2CDFF', //  1.56
          300: '#9EB0FF', //  2.08
          400: '#758FFF', //  2.95
          500: '#5170FF', //  4.07  ← LOGO BLUE
          600: '#3658EC', //  5.58  ✓ text-safe
          700: '#2240C3', //  8.11  ✓
          800: '#1A2A70', // 13.05  ✓ primary surface / body text
          900: '#111A40', // 16.86  ✓ dark sections
          950: '#090E25', // 19.07  ✓ deepest surface / footer
        },

        // Green scale — H=158. `mint-400` is the exact logo green.
        mint: {
          50: '#E5FFF6', //  1.05
          100: '#C2FFE9', //  1.12
          200: '#8FFFD6', //  1.20
          300: '#4DFFBE', //  1.28
          400: '#00FFA2', //  1.33  ← LOGO GREEN — dark backgrounds only
          500: '#00CC81', //  2.11  large text / icons on light
          600: '#009E64', //  3.46  large text only
          700: '#007A4E', //  5.39  ✓ text-safe on light
          800: '#005C3A', //  8.10  ✓
          900: '#00422A', // 11.58  ✓
        },

        surface: '#F5F8FF', // faint blue-tinted gray, pulled from navy-50
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
      },

      boxShadow: {
        card: '0 1px 2px rgba(17,26,64,.04), 0 8px 24px -8px rgba(17,26,64,.10)',
        lift: '0 8px 16px -6px rgba(17,26,64,.10), 0 24px 48px -12px rgba(17,26,64,.20)',
        glow: '0 0 0 1px rgba(0,255,162,.30), 0 12px 40px -8px rgba(0,255,162,.35)',
        'glow-blue': '0 0 0 1px rgba(81,112,255,.30), 0 12px 40px -8px rgba(81,112,255,.40)',
      },

      backgroundImage: {
        // The logo's own left-to-right ramp, reused as the signature gradient.
        'brand-gradient': 'linear-gradient(100deg, #5170FF 0%, #00FFA2 100%)',
        'brand-gradient-soft': 'linear-gradient(100deg, #5170FF 0%, #4DFFBE 100%)',
        // Animated accent ramp: brand green → brand blue → back.
        'spectrum-gradient': 'linear-gradient(90deg, #00FFA2 0%, #5170FF 50%, #00FFA2 100%)',
        'grid-navy':
          'linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px)',
      },

      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(.85)', opacity: '.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        wave: {
          '0%,100%': { transform: 'scaleY(.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Slow drifting light sources. Transform-only, so they run on the GPU.
        'drift-a': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(8%,6%) scale(1.12)' },
          '66%': { transform: 'translate(-6%,10%) scale(.94)' },
        },
        'drift-b': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-10%,-8%) scale(1.15)' },
        },
        'drift-c': {
          '0%,100%': { transform: 'translate(0,0) scale(.95)', opacity: '.55' },
          '50%': { transform: 'translate(12%,-6%) scale(1.1)', opacity: '1' },
        },
        // Moves a 300%-wide gradient across text or a bar.
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Light sweep across a button.
        shimmer: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },

      animation: {
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(.4,0,.6,1) infinite',
        wave: 'wave 1.1s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'drift-a': 'drift-a 22s ease-in-out infinite',
        'drift-b': 'drift-b 28s ease-in-out infinite',
        'drift-c': 'drift-c 18s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease-in-out infinite',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
      },
    },
  },
  plugins: [],
}
