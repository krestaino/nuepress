import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    post: null,
    posts: null
  },

  mutations: {
    setPost (state, data) {
      state.post = data
    },
    setPosts (state, data) {
      state.posts = data
    }
  }
})

export default store
