<template>
  <div class="page-container">
    <ArticleList :articles="articles" />
    <InfiniteLoading
      @done="newArticles => (articles = [...articles, ...newArticles])"
      :articles="articles"
      :params="{ author: 1 }"
    />
  </div>
</template>

<script>
import ArticleList from '~/components/ArticleList';
import InfiniteLoading from '~/components/InfiniteLoading';

export default {
  async asyncData({ app, params, store }) {
    const { data } = await app.$axios.get(`${process.env.WORDPRESS_API_URL}/wp/v2/posts`, {
      params: { ...store.state.params, author: 1 }
    });
    return { articles: data };
  },

  components: {
    ArticleList,
    InfiniteLoading
  },

  head() {
    return {
      title: `${this.$route.params.author} | ${this.$store.state.meta.name}`,
      meta: [{ description: this.$store.state.meta.description }]
    };
  }
};
</script>
