<template>
  <div
    class="flex shadow-2xl border border-t-0 border-gray-400 dark:border-gray-700 rounded-lg rounded-b-lg rounded-t-none overflow-hidden"
  >
    <div class="bg-white dark:bg-gray-800 overflow-x-hidden">
      <TheHero :hero-article="articles[0]" />
      <ArticleList :articles="[...articles].slice(1)" />
      <InfiniteLoading @done="newArticles => (articles = [...articles, ...newArticles])" />
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
