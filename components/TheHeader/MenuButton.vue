<template>
  <button @click="$emit('click')" class="md:hidden ml-2">
    <MenuIcon v-if="!$store.state.header.menuOpen" class="icon" />
    <CloseIcon v-else class="icon" />
  </button>
</template>

<script>
import CloseIcon from '~/assets/svg/Clear.vue';
import MenuIcon from '~/assets/svg/Menu.vue';

export default {
  components: {
    CloseIcon,
    MenuIcon
  }
};
</script>
