const webpack = require('webpack')

module.exports = {
  // Build configuration
  build: {
    // Run ESLINT on save
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    vendor: [
      'moment'
    ]
  },
  css: [
    'normalize.css/normalize.css'
  ],

  // Headers of the page
  head: {
    title: 'wp-vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Customize the progress-bar color
  loading: { color: '#384D66' },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    ['@nuxtjs/google-analytics', {
      id: 'UA-93904346-3'
    }]
  ],

  sitemap: {
    routes (callback) {
      const posts = axios.get(`https://wp.kmr.io/wp-json/wp/v2/posts?orderby=date`).then(res => {
        return res.data.map(item => '/' + item.slug)
      })
      const pages = ['/pages/sample-page']
      return Promise.all([posts, pages]).then(values => {
        callback(null, values.join().split(','))
      })
    }
  },

  plugins: [
    { src: '~plugins/vue-lazyload', ssr: false },
    { src: '~plugins/web-font-loader', ssr: false },
    { src: '~plugins/mixins' }
  ],

  vendor: ['lightgallery.js']
}
