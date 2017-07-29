<template>
  <main class="outer-container">
    <article-list :posts="posts"></article-list>
    <button @click="morePosts">More Articles</button>
  </main>
</template>

<script>
import ArticleList from '~/components/ArticleList'
import axios from 'axios'

export default {
  components: {
    ArticleList
  },

  data () {
    return {
      page: 1
    }
  },

  computed: {
    meta () { return this.$store.state.meta },
    posts () { return this.$store.state.posts }
  },

  async asyncData ({ store, params }) {
    if (store.state.posts.length === 0) {
      let posts = await axios.get(`${store.state.wpAPI}/wp/v2/posts?orderby=date&per_page=10&_embed`)
      store.commit('setPosts', posts.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wpAPI)
      store.commit('setMeta', meta.data)
    }
  },

  methods: {
    morePosts () {
      axios.get(`${this.$store.state.wpAPI}/wp/v2/posts?orderby=date&per_page=10&_embed&page=${this.page++}`)
        .then(response => {
          this.$store.commit('setPosts', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  head () {
    return {
      title: `Home | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
main {
  padding-top: 32px;
}
</style>
