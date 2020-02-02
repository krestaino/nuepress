<template>
  <nav
    :key="$store.state.header.menuOpen"
    :class="{ animate: true, hidden: !$store.state.header.menuOpen }"
    class="flex flex-col text-lg md:hidden"
  >
    <slot></slot>
  </nav>
</template>
