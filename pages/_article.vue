<template>
  <Article :data="article" type="article" />
</template>

<script>
import Article from '~/components/ArticleAndPage.vue';

export default {
  async asyncData({ app, store, params }) {
    const { data } = await app.$axios.get(`${process.env.WORDPRESS_API_URL}/wp/v2/posts`, {
      params: {
        slug: params.article,
        _embed: true
      }
    });
    return { article: data[0] };
  },

  components: {
    Article
  }
};
</script>
