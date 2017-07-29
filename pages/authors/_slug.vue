<template>
  <section class="outer-container">
    <h1 class="page-title" v-html="author.name"></h1>
    <p v-html="author.description"></p>
    <article-list :posts="authorPosts.posts"></article-list>
  </section>
</template>

<script>
import _ from 'lodash'
import ArticleList from '~/components/ArticleList'
import axios from 'axios'

export default {
  components: {
    ArticleList
  },

  computed: {
    meta () { return this.$store.state.meta },
    author () { return _.find(this.$store.state.authors, {'slug': this.$route.params.slug}) },
    authorPosts () { return _.find(this.$store.state.authorPosts, {'slug': this.$route.params.slug}) },
    authors () { return this.$store.state.authors }
  },

  async asyncData ({ store, params }) {
    if (!store.state.authors) {
      let authors = await axios.get(`${store.state.wpAPI}/wp/v2/users?per_page=100`)
      store.commit('setAuthors', authors.data)
    }

    if (!_.find(store.state.authorPosts, {'slug': params.slug})) {
      let author = _.find(store.state.authors, {'slug': params.slug})
      let authorPosts = await axios.get(`${store.state.wpAPI}/wp/v2/posts?orderby=date&per_page=10&author=${author.id}&_embed`)
      store.commit('setAuthorPosts', {slug: params.slug, posts: authorPosts.data})
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wpAPI)
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

h1 {
  margin-bottom: 4px;
}

p {
  margin-bottom: 32px;
}
</style>
