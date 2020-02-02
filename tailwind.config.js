module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        'white-translucent': 'rgba(255,255,255, 0.92)',
        'dark-translucent': 'rgba(45,55,72, 0.92)'
      },
      height: {
        'half-screen': '50vh',
        '160': '48rem'
      },
      inset: {
        '12': '3rem',
        '20': '5rem'
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Roboto Slab', 'serif']
    }
  },
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover'],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
    borderWidth: ['first'],
    textColor: ['dark', 'dark-hover', 'dark-active', 'dark-group-hover', 'group-hover'],
    bgBlur: ['dark'],
    opacity: ['hover'],
    margin: ['hover', 'responsive', 'first'],
    padding: ['first', 'responsive'],
    spacing: ['responsive']
  },
  whitelist: ['mode-dark'],
  plugins: [require('tailwindcss-dark-mode')()]
};
