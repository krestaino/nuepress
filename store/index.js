import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    categories: null,
    meta: null,
    post: null,
    posts: null
  },

  mutations: {
    setCategories (state, data) {
      state.categories = data
    },
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
