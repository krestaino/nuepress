import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    topics: null,
    meta: null,
    post: null,
    posts: null,
    users: null
  },

  mutations: {
    setTopics (state, data) {
      state.topics = data
    },
    setMeta (state, data) {
      state.meta = data
    },
    setPost (state, data) {
      state.post = data
    },
    setPosts (state, data) {
      state.posts = data
    },
    setUsers (state, data) {
      state.users = data
    }
  }
})

export default store
