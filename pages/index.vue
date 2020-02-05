<template>
  <div class="page-container">
    <div class="bg-white dark:bg-gray-800 overflow-x-hidden pb-0">
      <TheHero :hero-article="articles[0]" />
      <ArticleList :articles="[...articles].slice(1)" />
      <InfiniteLoading
        v-if="ready"
        @done="newArticles => (articles = [...articles, ...newArticles])"
        :articles="articles"
      />
    </div>
  </div>
</template>

<script>
import ArticleList from '~/components/ArticleList';
import TheHero from '~/components/TheHero';
import InfiniteLoading from '~/components/InfiniteLoading';

export default {
  async asyncData({ app, store, params }) {
    const { data } = await app.$axios.get(
      `${process.env.WORDPRESS_API_URL}/wp/v2/posts?orderby=date&per_page=10&_embed`
    );
    return { articles: data };
  },

  data() {
     return {
       ready: false
     }
  },

  mounted() {
    window.setTimeout(() => this.ready = true, 5000)
  },

  components: {
    ArticleList,
    TheHero,
    InfiniteLoading
  },

  head({ $store }) {
    return {
      title: `Home | ${$store.state.meta.name}`,
      meta: [{ description: $store.state.meta.description }]
    };
  }
};
</script>
