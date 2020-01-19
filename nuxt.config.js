import axios from 'axios'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['normalize.css/normalize.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-lazyload', ssr: false },
    { src: '~/plugins/vue-scrollto', ssr: false },
    { src: '~/plugins/web-font-loader', ssr: false },
    { src: '~/plugins/disqus' },
    { src: '~/plugins/mixins' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    // '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  generate: {
    routes () {
      let posts = axios.get('https://wp.kmr.io/wp-json/wp/v2/posts', { params: { orderby: "date", per_page: 1000000, _embed: null } }).then((res) => {
        return res.data.map((post) => {
          return {
            route: '/' + post.slug,
            payload: post
          }
        })
      })
      let pages = axios.get('https://wp.kmr.io/wp-json/wp/v2/pages', { params: { orderby: "date", per_page: 1000000, _embed: null } }).then((res) => {
        return res.data.map((page) => {
          return {
            route: '/pages/' + page.slug,
            payload: page
          }
        })
      })
      let topics = axios.get('https://wp.kmr.io/wp-json/wp/v2/categories', { params: { per_page: 1000000 } }).then((res) => {
        return res.data.map((topic) => {
          return {
            route: '/topics/' + topic.slug,
            payload: topic
          }
        })
      })
      let authors = axios.get('https://wp.kmr.io/wp-json/wp/v2/users', { params: { per_page: 1000000 } }).then((res) => {
        return res.data.map((author) => {
          return {
            route: '/authors/' + author.slug,
            payload: author
          }
        })
      })
      return Promise.all([posts, pages, topics, authors]).then(values => {
        return [...values[0], ...values[1], ...values[2], ...values[3]]
      })
    }
  }
};
