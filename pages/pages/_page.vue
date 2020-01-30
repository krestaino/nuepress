<template>
  <Page :data="page" type="page" />
</template>

<script>
import Page from '~/components/ArticleAndPage.vue';

export default {
  async asyncData({ app, store, params }) {
    const { data } = await app.$axios.get(`${process.env.WORDPRESS_API_URL}/wp/v2/pages`, {
      params: {
        slug: params.page,
        _embed: true
      }
    });
    return { page: data[0] };
  },

  components: {
    Page
  }
};
</script>
