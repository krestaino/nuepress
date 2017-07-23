<template>
  <header>
    <div class="outer-container">
      <div class="site-title">
        <nuxt-link to="/" exact><h1 v-html="meta.name"></h1></nuxt-link>
        <p v-if="meta.description" v-html="meta.description"></p>
      </div>
      <nav>
        <nuxt-link to="/" exact>Latest Stories</nuxt-link>
        <nuxt-link to="/topics">Topics</nuxt-link>
        <nuxt-link to="/authors">Authors</nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    meta () { return this.$store.state.meta }
  }
}
</script>

<style scoped lang="scss">
header {
  background-color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: lighter;
  position: sticky;
  top: 0;
}

.site-title {
  margin-right: 32px;

  p {
    margin-top: 4px;
  }
}

a {
  color: #999;
  text-decoration: none;

  & + a {
    margin-left: 22px;
  }

  &.nuxt-link-active {
    border-bottom: 2px solid;
  }
}

.outer-container {
  align-items: flex-end;
  display: flex;
  margin: 0 auto;
  padding: 22px 0;
}
</style>
