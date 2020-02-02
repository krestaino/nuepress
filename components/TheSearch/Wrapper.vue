<template>
  <section
    role="search"
    ref="autoSuggest"
    :key="$store.state.searchOpen"
    class="flex flex-col top-12 font-sans w-full"
    :class="{
      animate: true,
      'md:items-center': !$store.state.header.searchOpen,
      'animate-none': !$store.state.header.searchOpen
    }"
    v-if="$store.state.header.searchOpen"
  >
    <slot></slot>
  </section>
</template>
