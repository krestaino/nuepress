import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    posts: null
  },
  mutations: {
    setPosts (state, data) {
      state.posts = data
    }
  }
})

export default store
