<template>
  <header>
    <nav>
      <h1 v-html="meta.name"></h1>
      <p v-html="meta.description"></p>
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

</style>
