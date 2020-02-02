<template>
  <nav
    :key="$store.state.header.SearchOpen"
    :class="{ animate: true }"
    class="hidden md:flex dark:border-gray-600 ml-4 items-end"
  >
    <slot></slot>
  </nav>
</template>
