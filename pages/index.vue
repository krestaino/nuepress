<template>
  <div class="home">
    <div class="articles">
      <TheHero :hero-article="articlesList[0]" />
      <ArticleList :articles="[...articlesList].slice(1)" />
      <client-only>
        <InfiniteLoading ref="infiniteLoading" @infinite="moreArticles">
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
      </client-only>
    </div>
    <TheSidebar />
  </div>
</template>

<script>
import ArticleList from '~/components/ArticleList';
import TheHero from '~/components/TheHero';
import TheSidebar from '~/components/TheSidebar';
import InfiniteLoading from 'vue-infinite-loading';
import Smile from '~/assets/svg/Smile.vue';
import Spinner1 from '~/components/Spinner1.vue';

export default {
  async asyncData({ app, store, params }) {
    const { data } = await app.$axios.get(
      `${process.env.WORDPRESS_API_URL}/wp/v2/posts?orderby=date&per_page=10&_embed`
    );
    return { articles: data };
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
    articlesList() {
      return [...this.articles].filter(
        article => !article.categories.includes(parseInt(process.env.FEATURED_ID))
      );
    }
  },

  data() {
    return {
      infiniteLoadingPage: 1
    };
  },

  head() {
    return {
      title: `Home | ${this.$store.state.meta.name}`,
      meta: [{ description: this.$store.state.meta.description }]
    };
  },

  methods: {
    moreArticles($state) {
      this.$axios
        .get(`${process.env.WORDPRESS_API_URL}/wp/v2/posts`, {
          params: {
            orderby: 'date',
            per_page: 10,
            categories_exclude: process.env.FEATURED_ID,
            page: this.infiniteLoadingPage + 1,
            _embed: true
          }
        })
        .then(response => {
          this.articles = [...this.articles, ...response.data];
          this.infiniteLoadingPage++;
          $state.loaded();
        })
        .catch(() => $state.complete());
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
