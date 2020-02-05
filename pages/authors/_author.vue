<template>
  <div class="page-container flex-col">
    <ArticleList :articles="articles" />
    <InfiniteLoading
      @done="newArticles => (articles = [...articles, ...newArticles])"
      :articles="articles"
    />
  </div>
</template>

<script>
import find from 'lodash/find';
import ArticleList from '~/components/ArticleList';
import InfiniteLoading from '~/components/InfiniteLoading';
import Smile from '~/assets/svg/Smile.vue';
import Spinner1 from '~/components/Spinner1.vue';

export default {
  async asyncData({ app, store, params }) {
    const { data } = await app.$axios.get(
      `${process.env.WORDPRESS_API_URL}/wp/v2/posts?orderby=date&per_page=10&slug=${params.author}&_embed`
    );
    return { articles: data };
  },

  // async asyncData({ app, store, params }) {
  //   if (!store.state.authors) {
  //     let authors = await app.$axios.get(
  //       `${process.env.WORDPRESS_API_URL}/wp/v2/users?per_page=1000000`
  //     );
  //     store.commit('setAuthors', authors.data);
  //   }

  //   if (!find(store.state.authorArticles, { slug: params.author })) {
  //     let author = find(store.state.authors, { slug: params.author });
  //     let authorArticles = await app.$axios.get(
  //       `${process.env.WORDPRESS_API_URL}/wp/v2/posts?orderby=date&per_page=10&author=${author.id}&_embed`
  //     );
  //     store.commit('setAuthorArticles', {
  //       slug: params.author,
  //       articles: authorArticles.data,
  //       infiniteLoading: true,
  //       page: 1
  //     });
  //   }
  // },

  components: {
    ArticleList,
    InfiniteLoading,
    Smile,
    Spinner1
  },

  head() {
    return {
      title: `${this.author} | ${this.$store.state.meta.name}`,
      meta: [{ description: this.$store.state.meta.description }]
    };
  }
};
</script>
