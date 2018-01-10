<template>
  <div class="home">
    <div class="articles">
      <TheHero :heroArticle="heroArticle" v-if="heroArticle"/>
      <ArticleList :articles="$store.state.articles"/>
      <InfiniteLoading v-if="indexInfiniteLoading.enabled" :on-infinite="moreArticles" ref="infiniteLoading"/>
    </div>
    <TheSidebar :featuredArticles="$store.state.featuredArticles"/>
  </div>
</template>

<script>
import ArticleList from '~/components/ArticleList'
import TheHero from '~/components/TheHero'
import InfiniteLoading from '~/components/InfiniteLoading'
import TheSidebar from '~/components/TheSidebar'

export default {
  async asyncData ({ app, store, params }) {
    if (!store.state.articles.length) {
      let articles = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories_exclude=${store.state.featuredID}&_embed`)
      store.commit('setArticles', articles.data)
    }

    if (!store.state.featuredArticles.length) {
      let articles = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=${store.state.featuredID}&_embed`)
      store.commit('setFeaturedArticles', articles.data)
    }
  },

  components: {
    ArticleList,
    TheHero,
    InfiniteLoading,
    TheSidebar
  },

  computed: {
    heroArticle () {
      return this.$store.state.articles[0]
    },
    indexInfiniteLoading () {
      return this.$store.state.indexInfiniteLoading
    }
  },

  head () {
    return {
      title: `Home | ${this.$store.state.meta.name}`,
      meta: [
        { description: this.$store.state.meta.description }
      ]
    }
  },

  methods: {
    moreArticles () {
      this.indexInfiniteLoading.page++

      this.$axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories_exclude=${this.$store.state.featuredID}&page=${this.indexInfiniteLoading.page}&_embed`)
        .then(response => {
          this.$store.commit('setArticles', response.data)
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

<style lang="scss">
.home {
  .article-list {
    article {
      &:first-child {
        display: none;
      }

      &:nth-child(2) {
        border-top: 0;
        padding-top: 0;
      }
    }
  }
}
</style>
