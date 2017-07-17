import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    meta: null,
    post: null,
    posts: null
  },

  mutations: {
    setMeta (state, data) {
      state.meta = data
    },
    setPost (state, data) {
      state.post = data
    },
    setPosts (state, data) {
      state.posts = data
    }
  }
})

export default store
