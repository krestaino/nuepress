<template>
  <div class="flex relative w-full">
    <label class="hidden" for="search">Search</label>
    <input
      class="rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-full px-3 py-2 border-2 border-gray-400 dark:border-gray-400 focus:border-blue-500 mt-4 outline-none"
      id="search"
      name="search"
      placeholder="Search articles"
      ref="searchQuery"
      type="text"
      v-model="searchQuery"
      @keyup.prevent="$emit('keyup', searchQuery)"
      @keydown.prevent.enter="$emit('keydownEnter')"
      @keydown.prevent.down="$emit('keydownDown')"
      @keydown.prevent.up="$emit('keydownUp')"
    />
    <transition name="fade">
      <Spinner2 class="spinner-2 absolute right-0 -mr-4 top-0 p-8" v-if="loading" />
    </transition>
  </div>
</template>

<script>
import Spinner2 from '~/components/Spinner2';

export default {
  components: {
    Spinner2
  },

  props: {
    loading: Boolean
  },

  data() {
    return {
      searchQuery: ''
    };
  },

  mounted() {
    if (this.$refs.searchQuery) {
      this.$refs.searchQuery.focus();
    }
  }
};
</script>
