import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    topics: null,
    topicArticles: [],
    meta: null,
    article: null,
    articles: [],
    authors: null,
    authorArticles: [],
    featuredArticles: [],
    wordpressAPI: 'https://wp.kmr.io/wp-json'
  },

  mutations: {
    setFeaturedArticles (state, data) {
      state.featuredArticles.push(data)
    },
    setTopics (state, data) {
      state.topics = data
    },
    setTopicArticles (state, data) {
      state.topicArticles.push(data)
    },
    setMeta (state, data) {
      state.meta = data
    },
    setArticle (state, data) {
      state.article = data
    },
    setArticles (state, data) {
      state.articles = state.articles.concat(data)
    },
    setAuthors (state, data) {
      state.authors = data
    },
    setauthorArticles (state, data) {
      state.authorArticles.push(data)
    }
  }
})

export default store
