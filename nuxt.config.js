const webpack = require('webpack');

module.exports = {
  // Global CSS
  css: ['normalize.css/normalize.css'],

  // Headers of the page
  head: {
    title: 'wp-vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Customize the progress-bar color
  loading: { color: '#384D66' },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-93904346-3'
      }
    ]
  ],

  plugins: [
    { src: '~plugins/vue-lazyload', ssr: false },
    { src: '~plugins/vue-scrollto', ssr: false },
    { src: '~plugins/web-font-loader', ssr: false },
    { src: '~plugins/mixins' }
  ],

  vendor: ['lightgallery.js']
};
