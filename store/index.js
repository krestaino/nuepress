import Vuex from 'vuex'

const store = () => new Vuex.Store({

  actions: {
    async nuxtServerInit ({ commit, state }) {
      let meta = await this.$axios.get(state.wordpressAPI)
      commit('setMeta', meta.data)
    }
  },

  state: {
    article: null,
    articles: [],
    page: null,
    authorArticles: [],
    authors: null,
    indexInfiniteLoading: {
      enabled: true,
      page: 1
    },
    featuredArticles: [],
    featuredColor: {},
    featuredID: 194,
    meta: {
      description: '',
      name: ''
    },
    topicArticles: [],
    topics: null,
    wordpressAPI: 'https://wp-api.kmr.io/wp-json'
  },

  mutations: {
    setArticle (state, data) {
      state.article = data
    },
    setArticles (state, data) {
      state.articles = state.articles.concat(data)
    },
    setPage (state, data) {
      state.page = data
    },
    setAuthorArticles (state, data) {
      state.authorArticles.push(data)
    },
    setAuthors (state, data) {
      state.authors = data
    },
    setIndexInfiniteLoading (state, data) {
      state.indexInfiniteLoading = data
    },
    setFeaturedColor (state, data) {
      state.featuredColor = data
    },
    setFeaturedArticles (state, data) {
      state.featuredArticles = state.featuredArticles.concat(data)
    },
    setMeta (state, data) {
      state.meta = data
    },
    setTopicArticles (state, data) {
      state.topicArticles.push(data)
    },
    setTopics (state, data) {
      state.topics = data
    }
  }
})

export default store
