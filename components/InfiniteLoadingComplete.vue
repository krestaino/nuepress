<template>
  <div class="text-gray-600 dark:text-gray-500">
    <Smile />
    <div>No more articles!</div>
  </div>
</template>

<script>
import Smile from '~/assets/svg/Smile.vue';

export default {
  components: {
    Smile
  }
};
</script>

<style>
.infinite-status-prompt svg {
  @apply mx-auto mb-1;
}
</style>
