<template>
  <nuxt-link class="nav-link flex md:ml-4" :to="to">
    <ArrowIcon class="md:hidden -ml-2" v-if="$route.fullPath === to" />{{ name }}
  </nuxt-link>
</template>

<script>
import ArrowIcon from '~/assets/svg/ArrowRight.vue';

export default {
  components: {
    ArrowIcon
  },

  props: {
    name: String,
    to: String
  }
};
</script>
