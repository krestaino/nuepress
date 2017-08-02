<template>
  <div class="author">
    <div class="articles">
      <div class="page-title">
        <h1 v-html="author.name"></h1>
        <p v-html="author.description"></p>
      </div>
      <article-list :articles="authorArticles.articles"></article-list>
    </div>
    <sidebar :featuredArticles="featuredArticles"></sidebar>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

import ArticleList from '~/components/ArticleList'
import Sidebar from '~/components/Sidebar'

export default {
  async asyncData ({ store, params }) {
    if (!store.state.featuredArticles.length) {
      let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=194&_embed`)
      store.commit('setFeaturedArticles', articles.data)
    }

    if (!store.state.authors) {
      let authors = await axios.get(`${store.state.wordpressAPI}/wp/v2/users?per_page=100`)
      store.commit('setAuthors', authors.data)
    }

    if (!_.find(store.state.authorArticles, {'slug': params.article})) {
      let author = _.find(store.state.authors, {'slug': params.article})
      let authorArticles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&author=${author.id}&_embed`)
      store.commit('setAuthorArticles', {slug: params.article, articles: authorArticles.data})
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  components: {
    ArticleList,
    Sidebar
  },

  computed: {
    author () { return _.find(this.$store.state.authors, {'slug': this.$route.params.article}) },
    authorArticles () { return _.find(this.$store.state.authorArticles, {'slug': this.$route.params.article}) },
    authors () { return this.$store.state.authors },
    featuredArticles () { return this.$store.state.featuredArticles },
    meta () { return this.$store.state.meta }
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

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

.author {
  display: flex;

  .articles {
    background-color: #efefef;
    padding: 0 32px;
    max-width: 900px;
    width: 100%;
  }
}
</style>
