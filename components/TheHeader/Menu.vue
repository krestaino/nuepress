<template>
  <div :class="{ hidden: searchOpen }">
    <div class="border-t md:border-t-0 border-gray-400 dark:border-gray-600">
      <nav :key="menuOpen" :class="{ animate: true, 'animate-none': !menuOpen }">
        <slot></slot>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    menuOpen() {
      return this.$store.state.header.menuOpen;
    },
    searchOpen() {
      return this.$store.state.header.searchOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  @apply flex flex-col text-lg font-light fixed top-12 left-0 w-full z-10 h-screen border-t border-gray-400;
}

.mode-dark nav {
  @apply border-gray-600;
}

@screen md {
  nav {
    @apply flex-row ml-8 static bg-transparent text-left h-auto border-t-0;
  }
}
</style>
