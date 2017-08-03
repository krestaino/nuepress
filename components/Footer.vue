<template>
  <footer>
    <div v-if="meta">
      <nuxt-link class="fancy" to="/" exact><span v-html="meta.name"></span></nuxt-link>
      <div v-if="meta.description" v-html="meta.description"></div>
      <div>© {{ year }}</div>
    </div>
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

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

footer {
  > div {
    align-items: center;
    background-color: #fff;
    color: #aaa;
    display: flex;
    flex-direction: column;
    height: 200px;
    font-family: 'Roboto', sans-serif;
    font-size: .7rem;
    margin: auto;
    max-width: $containerWidth;
    padding: 64px 32px;
    text-align: center;
  }

  a {
    color: #aaa;
  }
}
</style>
