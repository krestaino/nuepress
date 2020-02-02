<template>
  <div
    class="sticky-nav fixed top-0 left-0 w-full h-12 md:h-20 z-10 font-sans bg-blur bg-white-translucent dark:bg-dark-translucent border-b border-gray-400 dark:border-gray-700 shadow-lg"
  >
    <div class="container mx-auto flex h-full px-5 md:px-8 items-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    fullScreenHeader() {
      const { menuOpen, searchOpen } = this.$store.state.header;
      return menuOpen || searchOpen;
    }
  }
};
</script>
