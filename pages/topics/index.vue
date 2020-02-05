<template>
  <ul class="page-container">
    <li
      v-for="topic in $store.state.topics"
      v-if="topic.slug !== 'featured' && topic.count"
      :key="topic.id"
    >
      <nuxt-link :to="`/topics/${topic.slug}`">
        <h2 v-html="topic.name"></h2>
        <div v-html="topic.description"></div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  async asyncData({ app, store, params }) {
    if (!store.state.topics) {
      let topics = await app.$axios.get(
        `${process.env.WORDPRESS_API_URL}/wp/v2/categories?per_page=1000000`
      );
      store.commit('setTopics', topics.data);
    }
  },

  head() {
    return {
      title: `Topics | ${this.$store.state.meta.name}`,
      meta: [{ description: this.$store.state.meta.description }]
    };
  }
};
</script>
