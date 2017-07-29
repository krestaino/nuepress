<template>
  <main class="outer-container">
    <div class="inner-container">
      <article-list :articles="articles"></article-list>
      <infinite-loading :on-infinite="moreArticles" ref="infiniteLoading"></infinite-loading>
    </div>
    <sidebar></sidebar>
  </main>
</template>

<script>
import axios from 'axios'
import ArticleList from '~/components/ArticleList'
import InfiniteLoading from '~/components/InfiniteLoading'
import Sidebar from '~/components/Sidebar'

export default {
  components: {
    ArticleList,
    InfiniteLoading,
    Sidebar
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
    moreArticles () {
      axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&_embed&page=${this.page++}`)
        .then(response => {
          this.$store.commit('setArticles', response.data)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        })
        .catch(error => {
          console.log(error)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
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
.outer-container {
  display: flex;
  padding-top: 48px;

  .inner-container {
    margin-right: 48px;
    max-width: 900px;
    width: 100%;
  }
}
</style>
