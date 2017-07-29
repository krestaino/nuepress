<template>
  <main class="outer-container">
    <article-list :articles="articles"></article-list>
    <button @click="morearticles">More Articles</button>
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
    articles () { return this.$store.state.articles }
  },

  async asyncData ({ store, params }) {
    if (store.state.articles.length === 0) {
      let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&_embed`)
      store.commit('setArticles', articles.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  methods: {
    morearticles () {
      axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&_embed&page=${this.page++}`)
        .then(response => {
          this.$store.commit('setArticles', response.data)
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
