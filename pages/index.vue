<template>
  <div class="home">
    <div class="articles">
      <Hero :heroArticle="heroArticle" v-if="heroArticle.length"/>
      <ArticleList :articles="articles"/>
      <InfiniteLoading v-if="indexInfiniteLoading.enabled" :on-infinite="moreArticles" ref="infiniteLoading"/>
    </div>
    <Sidebar :featuredArticles="featuredArticles"/>
  </div>
</template>

<script>
import axios from 'axios'

import ArticleList from '~/components/ArticleList'
import Hero from '~/components/Hero'
import InfiniteLoading from '~/components/InfiniteLoading'
import Sidebar from '~/components/Sidebar'

export default {
  async asyncData ({ store, params }) {
    if (!store.state.articles.length) {
      let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories_exclude=194,195&_embed`)
      store.commit('setArticles', articles.data)
    }

    if (!store.state.featuredArticles.length) {
      let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=194&_embed`)
      store.commit('setFeaturedArticles', articles.data)
    }

    if (store.state.heroArticle) {
      let article = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=195&_embed`)
      store.commit('setHeroArticle', article.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  components: {
    ArticleList,
    Hero,
    InfiniteLoading,
    Sidebar
  },

  computed: {
    articles () { return this.$store.state.articles },
    indexInfiniteLoading () { return this.$store.state.indexInfiniteLoading },
    featuredArticles () { return this.$store.state.featuredArticles },
    heroArticle () { return this.$store.state.heroArticle },
    meta () { return this.$store.state.meta || {} }
  },

  head () {
    return {
      title: `Home | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  },

  methods: {
    moreArticles () {
      this.indexInfiniteLoading.page++

      axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories_exclude=194,195&_embed&page=${this.indexInfiniteLoading.page}`)
        .then(response => {
          this.$store.commit('setArticles', response.data)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        })
        .catch(() => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          this.$store.commit('setIndexInfiniteLoading', { enabled: false })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;

  .hero {
    margin: 0 -32px;
  }

  .articles {
    background-color: #efefef;
    padding: 0 32px;
    max-width: 900px;
    width: 100%;

    @media (max-width: 1000px) {
      max-width: none;
    }

    @media (max-width: 700px) {
      padding: 0 16px;
    }

    .article-list {
      margin: 32px 0;
    }
  }
}
</style>
