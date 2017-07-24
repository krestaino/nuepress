import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    topics: null,
    topicPosts: [],
    meta: null,
    post: null,
    posts: [],
    authors: null,
    authorPosts: []
  },

  mutations: {
    setTopics (state, data) {
      state.topics = data
    },
    setTopicPosts (state, data) {
      state.topicPosts.push(data)
    },
    setMeta (state, data) {
      state.meta = data
    },
    setPost (state, data) {
      state.post = data
    },
    setPosts (state, data) {
      state.posts = state.posts.concat(data)
    },
    setAuthors (state, data) {
      state.authors = data
    },
    setAuthorPosts (state, data) {
      state.authorPosts.push(data)
    }
  }
})

export default store
