import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    article: null,
    articles: [],
    authorArticles: [],
    authors: null,
    indexInfiniteLoading: {
      enabled: true,
      page: 1
    },
    featuredArticles: [],
    featuredColor: {},
    featuredID: 194,
    meta: null,
    topicArticles: [],
    topics: null,
    wordpressAPI: 'https://wp.kmr.io/wp-json'
  },

  mutations: {
    setArticle (state, data) {
      state.article = data
    },
    setArticles (state, data) {
      state.articles = state.articles.concat(data)
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
