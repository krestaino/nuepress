<template>
  <div class="author">
    <div class="articles">
      <div class="page-title">
        <h1 v-html="author.name"></h1>
        <p v-html="author.description"></p>
      </div>
      <ArticleList :articles="authorArticles.articles"></ArticleList>
      <InfiniteLoading v-if="(authorArticles.infiniteLoading)  && (authorArticles.articles.length >= 10)" :on-infinite="moreArticles" ref="infiniteLoading"/>
    </div>
    <Sidebar :featuredArticles="featuredArticles"></Sidebar>
  </div>
</template>

<script>
import find from 'lodash/find'
import axios from 'axios'

import ArticleList from '~/components/ArticleList'
import InfiniteLoading from '~/components/InfiniteLoading'
import Sidebar from '~/components/Sidebar'

export default {
  async asyncData ({ store, params }) {
    if (!store.state.featuredArticles.length) {
      let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=${store.state.featuredID}&_embed`)
      store.commit('setFeaturedArticles', articles.data)
    }

    if (!store.state.authors) {
      let authors = await axios.get(`${store.state.wordpressAPI}/wp/v2/users?per_page=100`)
      store.commit('setAuthors', authors.data)
    }

    if (!find(store.state.authorArticles, {'slug': params.author})) {
      let author = find(store.state.authors, {'slug': params.author})
      let authorArticles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&author=${author.id}&_embed`)
      store.commit('setAuthorArticles', {slug: params.author, articles: authorArticles.data, infiniteLoading: true, page: 1})
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  components: {
    ArticleList,
    InfiniteLoading,
    Sidebar
  },

  computed: {
    author () { return find(this.$store.state.authors, {'slug': this.$route.params.author}) },
    authorArticles () { return find(this.$store.state.authorArticles, {'slug': this.$route.params.author}) },
    authors () { return this.$store.state.authors },
    featuredArticles () { return this.$store.state.featuredArticles },
    meta () { return this.$store.state.meta || {} }
  },

  head () {
    return {
      title: `${this.author.name} | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  },

  methods: {
    moreArticles () {
      this.authorArticles.page++

      axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&author=${this.author.id}&_embed&page=${this.authorArticles.page}`)
        .then(response => {
          this.authorArticles.articles = this.authorArticles.articles.concat(response.data)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        })
        .catch(() => {
          this.authorArticles.infiniteLoading = false
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        })
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
