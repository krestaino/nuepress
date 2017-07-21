<template>
  <header>
    <h1 v-html="meta.name"></h1>
    <p v-html="meta.description"></p>
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/topics">Topics</nuxt-link>
      <nuxt-link to="/authors">Authors</nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    meta () { return this.$store.state.meta }
  }
}
</script>

<style scoped>
a + a {
  margin-left: 16px;
}
</style>
