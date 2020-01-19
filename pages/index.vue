<template>
  <div class="home">
    <div class="articles">
      <TheHero v-if="heroArticle" :hero-article="heroArticle" />
      <ArticleList :articles="$store.state.articles" />
      <InfiniteLoading
        v-if="indexInfiniteLoading.enabled"
        ref="infiniteLoading"
        @infinite="moreArticles"
      >
        <span slot="spinner">
          <Spinner1 />
        </span>
        <span slot="no-results">
          <Smile />
          <div>No more articles!</div>
        </span>
        <span slot="no-more">
          <Smile />
          <div>No more articles!</div>
        </span>
      </InfiniteLoading>
    </div>
    <TheSidebar :featured-articles="$store.state.featuredArticles" />
  </div>
</template>

<script>
import ArticleList from '~/components/ArticleList';
import TheHero from '~/components/TheHero';
import TheSidebar from '~/components/TheSidebar';
import InfiniteLoading from 'vue-infinite-loading/src/components/InfiniteLoading.vue';
import Smile from '~/assets/svg/Smile.vue';
import Spinner1 from '~/components/Spinner1.vue';

export default {
  async asyncData({ app, store, params }) {
    if (!store.state.articles.length) {
      let articles = await app.$axios.get(
        `${process.env.WORDPRESS_API_URL}/wp/v2/posts?orderby=date&per_page=10&categories_exclude=${process.env.FEATURED_ID}&_embed`
      );
      store.commit('setArticles', articles.data);
    }

    if (!store.state.featuredArticles.length) {
      let articles = await app.$axios.get(
        `${process.env.WORDPRESS_API_URL}/wp/v2/posts?orderby=date&per_page=10&categories=${process.env.FEATURED_ID}&_embed`
      );
      store.commit('setFeaturedArticles', articles.data);
    }
  },

  components: {
    ArticleList,
    TheHero,
    TheSidebar,
    InfiniteLoading,
    Smile,
    Spinner1
  },

  computed: {
    heroArticle() {
      return this.$store.state.articles[0];
    },
    indexInfiniteLoading() {
      return this.$store.state.indexInfiniteLoading;
    }
  },

  head() {
    return {
      title: `Home | ${this.$store.state.meta.name}`,
      meta: [{ description: this.$store.state.meta.description }]
    };
  },

  methods: {
    moreArticles($state) {
      this.indexInfiniteLoading.page++;

      this.$axios
        .get(
          `${process.env.WORDPRESS_API_URL}/wp/v2/posts?orderby=date&per_page=10&categories_exclude=${process.env.FEATURED_ID}&page=${this.indexInfiniteLoading.page}&_embed`
        )
        .then(response => {
          this.$store.commit('setArticles', response.data);
          $state.loaded();
        })
        .catch(() => {
          $state.complete();
        });
    }
  }
};
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

      @media (max-width: 700px) {
        margin: 16px 0;
      }
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
