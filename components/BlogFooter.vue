<template>
  <footer>
    <nuxt-link class="fancy" to="/" exact><span v-html="meta.name"></span></nuxt-link>
    <div v-if="meta.description" v-html="meta.description"></div>
    <div>© {{ year }}</div>
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
  font-size: .7rem;
  margin-top: auto;
  padding: 64px 0;
  text-align: center;

  a {
    color: #aaa;
  }
}
</style>
