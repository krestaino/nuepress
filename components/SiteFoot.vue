<template>
  <footer>
    <nuxt-link to="/" exact><span v-html="meta.name"></span></nuxt-link>
    <p v-if="meta.description" v-html="meta.description"></p>
  </footer>
</template>

<script>
export default {
  computed: {
    meta () { return this.$store.state.meta },
    year () { return new Date().getFullYear() }
  }
}
</script>

<style scoped lang="scss">
@import './assets/css/vars.scss';

footer {
  color: #aaa;
  font-size: 60%;
  margin-top: auto;
  padding: 64px 0;
  text-align: center;

  a {
    color: $primary;
  }
}
</style>
