<template>
  <footer class="container mx-auto bg-white dark:bg-gray-800">
    <div
      class="border border-b-0 border-gray-300 dark:border-gray-700 flex flex-col items-center px-5 md:px-8 py-16 text-sm font-sans text-gray-700 dark:text-gray-500"
    >
      <span class="fancy link" to="/" @click.prevent="homeScrollTop">
        <span v-html="meta.name"></span>
      </span>
      <span v-if="meta.description" v-html="meta.description"></span>
      <span>© {{ year }}</span>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    meta() {
      return this.$store.state.meta;
    },
    year() {
      return new Date().getFullYear();
    }
  },

  mixins: {
    homeScrollTop: Function
  }
};
</script>
