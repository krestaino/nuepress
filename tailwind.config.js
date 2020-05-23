module.exports = {
  purge: ['./**/*.html', './**/*.vue'],
  theme: {
    darkSelector: '.dark',
    extend: {
      backgroundColor: {
        'white-translucent': 'rgba(255,255,255, 0.9)',
        'dark-translucent': 'rgba(45,55,72, 0.9)'
      },
      height: {
        'half-screen': '50vh',
        '160': '48rem'
      },
      inset: {
        '12': '3rem',
        '20': '5rem'
      },
      maxHeight: {
        '1/2-screen': '50vh'
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Roboto Slab', 'serif']
    }
  },
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover'],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within', 'focus'],
    borderWidth: ['first', 'responsive'],
    flex: ['responsive', 'hover', 'focus'],
    textColor: ['dark', 'dark-hover', 'dark-active', 'dark-group-hover', 'group-hover'],
    bgBlur: ['dark'],
    opacity: ['hover'],
    overflow: ['responsive', 'hover', 'focus'],
    margin: ['hover', 'responsive', 'first'],
    padding: ['first', 'responsive'],
    spacing: ['responsive']
  },
  whitelist: ['dark'],
  plugins: [require('tailwindcss-dark-mode')()]
};
