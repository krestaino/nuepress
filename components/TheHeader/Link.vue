<template>
  <nuxt-link class="py-2 my-2 flex md:ml-4" :to="to" @click.native="handleMenuClick(to)">
    <ArrowIcon class="md:hidden" v-if="$route.fullPath === to" />{{ name }}
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
  },

  methods: {
    handleMenuClick(to) {
      if (this.$route.fullPath === to) {
        this.$store.commit('setHeader', { menuOpen: false, searchOpen: false });
      } else {
        this.$router.push({ path: to });
      }
    }
  }
};
</script>
