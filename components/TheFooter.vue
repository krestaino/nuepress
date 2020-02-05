<template>
  <footer
    class="container mx-auto fixed bottom-0 left-0 right-0 text-center h-32 text-sm font-sans text-gray-700 dark:text-gray-500"
  >
    <span class="blue-link" to="/" @click.prevent="homeScrollTop">
      <span v-html="meta.name"></span>
    </span>
    <div v-if="meta.description" v-html="meta.description"></div>
    <div>© {{ new Date().getFullYear() }}</div>
  </footer>
</template>

<script>
export default {
  computed: {
    meta() {
      return this.$store.state.meta;
    }
  },

  mixins: {
    homeScrollTop: Function
  }
};
</script>
