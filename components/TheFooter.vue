<template>
  <footer
    class="container mx-auto relative flex flex-col items-center px-5 md:px-8 py-16 text-sm font-sans text-gray-700 dark:text-gray-500"
  >
    <span class="blue-link" to="/" @click.prevent="homeScrollTop">
      <span v-html="meta.name"></span>
    </span>
    <span v-if="meta.description" v-html="meta.description"></span>
    <span>© {{ new Date().getFullYear() }}</span>
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
