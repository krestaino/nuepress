<template>
  <nav
    :key="$store.state.header.SearchOpen"
    :class="{ animate: true }"
    class="hidden md:flex text-lg font-light dark:border-gray-600 ml-4"
  >
    <slot></slot>
  </nav>
</template>
