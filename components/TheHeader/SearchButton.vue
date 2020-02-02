<template>
  <button @click="$emit('click')">
    <SearchIcon v-if="!$store.state.header.searchOpen" class="icon" />
    <CloseIcon v-else class="icon" />
  </button>
</template>

<script>
import CloseIcon from '~/assets/svg/Clear.vue';
import SearchIcon from '~/assets/svg/Search.vue';

export default {
  components: {
    CloseIcon,
    SearchIcon
  },
  props: {
    click: Function
  },

  mixins: {
    homeScrollTop: Function
  }
};
</script>
