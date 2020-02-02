<template>
  <div
    class="sticky-nav fixed top-0 left-0 w-full h-12 md:h-20 z-10 font-sans bg-blur bg-white-translucent dark:bg-dark-translucent"
  >
    <div
      class="container mx-auto flex h-full px-5 border-t-0 border-gray-300 pt-3 md:px-8 md:border-b md:items-center md:pt-0"
    >
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
