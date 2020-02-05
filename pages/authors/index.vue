<template>
  <div class="page-container p-5 md:p-8">
    <ul>
      <li v-for="author in $store.state.authors" :key="author.id">
        <nuxt-link :to="`/authors/${author.slug}`">
          <h2 v-html="author.name"></h2>
          <div v-html="author.description"></div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ app, store, params }) {
    if (!store.state.authors) {
      let authors = await app.$axios.get(
        `${process.env.WORDPRESS_API_URL}/wp/v2/users?per_page=1000000`
      );
      store.commit('setAuthors', authors.data);
    }
  },

  head() {
    return {
      title: `Authors | ${this.$store.state.meta.name}`,
      meta: [{ description: this.$store.state.meta.description }]
    };
  }
};
</script>
