<template>
  <div
    v-if="$store.state.header.menuOpen || $store.state.header.searchOpen"
    class="fixed inset-0 h-screen w-full z-10 top-12 md:top-20 bg-blur bg-white-translucent dark:bg-dark-translucent"
  >
    <div
      class="container mx-auto flex h-full px-5 md:px-8 border-t-0 border-gray-400 dark:border-gray-700 pt-3 md:border-b md:items-start md:pt-0"
    >
      <slot></slot>
    </div>
  </div>
</template>
