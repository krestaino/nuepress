<template>
  <div class="container mx-auto page-container">
    <div class="bg-white dark:bg-gray-800 pb-0">
      <TheHero :hero-article="articles[0]" />
      <ArticleList :articles="[...articles].slice(1)" />
      <InfiniteLoading
        @done="newArticles => (articles = [...articles, ...newArticles])"
        :articles="articles"
        v-if="articles.length"
      />
    </div>
  </div>
</template>

<script>
import ArticleList from '~/components/ArticleList';
import TheHero from '~/components/TheHero';
import InfiniteLoading from '~/components/InfiniteLoading';

export default {
  async asyncData({ $axios, store }) {
    const articles = await $axios.$get(`${process.env.WORDPRESS_API_URL}/wp/v2/posts`, {
      params: store.state.params
    });
    return { articles };
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
