<template>
  <main class="outer-container">
    <div class="inner-container">
      <div class="page-title">
        <h1 v-html="author.name"></h1>
        <p v-html="author.description"></p>
      </div>
      <article-list :articles="authorArticles.articles"></article-list>
    </div>
    <sidebar :featuredArticles="featuredArticles"></sidebar>
  </main>
</template>

<script>
import _ from 'lodash'
import ArticleList from '~/components/ArticleList'
import axios from 'axios'
import Sidebar from '~/components/Sidebar'

export default {
  components: {
    ArticleList,
    Sidebar
  },

  computed: {
    author () { return _.find(this.$store.state.authors, {'slug': this.$route.params.slug}) },
    authorArticles () { return _.find(this.$store.state.authorArticles, {'slug': this.$route.params.slug}) },
    authors () { return this.$store.state.authors },
    featuredArticles () { return this.$store.state.featuredArticles },
    meta () { return this.$store.state.meta }
  },

  async asyncData ({ store, params }) {
    if (!store.state.featuredArticles.length) {
      let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=194&_embed`)
      store.commit('setFeaturedArticles', articles.data)
    }

    if (!store.state.authors) {
      let authors = await axios.get(`${store.state.wordpressAPI}/wp/v2/users?per_page=100`)
      store.commit('setAuthors', authors.data)
    }

    if (!_.find(store.state.authorArticles, {'slug': params.slug})) {
      let author = _.find(store.state.authors, {'slug': params.slug})
      let authorArticles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&author=${author.id}&_embed`)
      store.commit('setAuthorArticles', {slug: params.slug, articles: authorArticles.data})
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  head () {
    return {
      title: `${this.author.name} | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/css/vars.scss';

.outer-container {
  display: flex;

  .inner-container {
    background-color: #efefef;
    padding: 0 32px;
    max-width: 900px;
    width: 100%;
  }

  .page-title {
    padding-bottom: 32px;
    padding-top: 0;
  }
}
</style>
