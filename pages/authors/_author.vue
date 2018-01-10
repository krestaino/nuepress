<template>
  <div class="author">
    <div class="articles">
      <div class="page-title">
        <h1>{{ author.name }}</h1>
        <p v-if="author.description">{{ author.description }}</p>
      </div>
      <ArticleListt :articles="authorArticles.articles" />
      <InfiniteLoading v-if="(authorArticles.infiniteLoading)  && (authorArticles.articles.length >= 10)" :on-infinite="moreArticles" ref="infiniteLoading"/>
    </div>
    <TheSidebar :featuredArticles="$store.state.featuredArticles" />
  </div>
</template>

<script>
import find from 'lodash/find'
import ArticleList from '~/components/ArticleList'
import InfiniteLoading from '~/components/InfiniteLoading'
import TheSidebar from '~/components/TheSidebar'

export default {
  async asyncData ({ app, store, params }) {
    if (!store.state.featuredArticles.length) {
      let articles = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=${store.state.featuredID}&_embed`)
      store.commit('setFeaturedArticles', articles.data)
    }

    if (!store.state.authors) {
      let authors = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/users?per_page=100`)
      store.commit('setAuthors', authors.data)
    }

    if (!find(store.state.authorArticles, {'slug': params.author})) {
      let author = find(store.state.authors, {'slug': params.author})
      let authorArticles = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&author=${author.id}&_embed`)
      store.commit('setAuthorArticles', {slug: params.author, articles: authorArticles.data, infiniteLoading: true, page: 1})
    }
  },

  components: {
    ArticleList,
    InfiniteLoading,
    TheSidebar
  },

  computed: {
    author () {
      return find(this.$store.state.authors, {
        'slug': this.$route.params.author
      })
    },
    authorArticles () {
      return find(this.$store.state.authorArticles, {
        'slug': this.$route.params.author
      })
    }
  },

  head () {
    return {
      title: `${this.author.name} | ${this.$store.state.meta.name}`,
      meta: [
        { description: this.$store.state.meta.description }
      ]
    }
  },

  methods: {
    moreArticles () {
      this.authorArticles.page++

      this.$axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&author=${this.author.id}&_embed&page=${this.authorArticles.page}`)
        .then(response => {
          this.authorArticles.articles = this.authorArticles.articles.concat(response.data)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        })
        .catch(() => {
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
