<template>
  <div :class="{ [$store.state.theme]: true }">
    <div
      class="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-serif min-h-screen flex flex-col"
    >
      <TheHeader />
      <main class="container mx-auto pt-12 md:pt-20 flex flex-grow" role="main">
        <nuxt />
      </main>
      <TheFooter />
    </div>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader';
import TheFooter from '../components/TheFooter';

export default {
  components: {
    TheHeader,
    TheFooter
  }
};
</script>
