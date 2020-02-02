<template>
  <header class="fixed top-0 left-0 w-full h-12 md:h-20 z-10 font-sans">
    <div
      class="container dark:border-gray-700 bg-blur bg-white-translucent dark:bg-dark-translucent h-full overflow-hidden"
      :class="{ 'md:flex-col h-screen items-start overflow-visible': fullScreenHeader }"
    >
      <slot></slot>
    </div>
  </header>
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

<style lang="scss">
header > div {
  @apply mx-auto flex px-5 border-t-0 border-gray-300 pt-3;
}

@screen md {
  header > div {
    @apply px-8 border-b items-center pt-0;
  }
}
</style>
