<template>
  <main class="outer-container">
    <div class="inner-container">
      <hero :featuredArticles="featuredArticles"></hero>
      <article-list :articles="articles"></article-list>
      <infinite-loading :on-infinite="moreArticles" ref="infiniteLoading">
        <spinner-1 class="spinner-1" slot="spinner"></spinner-1>
      </infinite-loading>
    </div>
    <sidebar :featuredArticles="featuredArticles"></sidebar>
  </main>
</template>

<script>
import axios from 'axios'
import ArticleList from '~/components/ArticleList'
import Hero from '~/components/Hero'
import InfiniteLoading from '~/components/InfiniteLoading'
import Sidebar from '~/components/Sidebar'
import Spinner1 from '~/components/Spinner1'

export default {
  components: {
    ArticleList,
    Hero,
    InfiniteLoading,
    Sidebar,
    Spinner1
  },

  data () {
    return {
      page: 1
    }
  },

  computed: {
    meta () { return this.$store.state.meta },
    articles () { return this.$store.state.articles },
    featuredArticles () { return this.$store.state.featuredArticles }
  },

  async asyncData ({ store, params }) {
    if (store.state.articles.length === 0) {
      let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories_exclude=194&_embed`)
      store.commit('setArticles', articles.data)
    }

    if (store.state.featuredArticles.length === 0) {
      let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=194&_embed`)
      store.commit('setFeaturedArticles', articles.data)
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

  .inner-container {
    background-color: #efefef;
    padding-right: 32px;
    max-width: 900px;
    width: 100%;
  }
}
</style>
