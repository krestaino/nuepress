<template>
  <header>
    <div class="outer-container">
      <div class="site-title">
        <nuxt-link to="/" exact><h1 v-html="meta.name"></h1></nuxt-link>
        <p v-if="meta.description" v-html="meta.description"></p>
      </div>
      <nav>
        <nuxt-link to="/" exact>Latest Articles</nuxt-link>
        <nuxt-link to="/topics">Topics</nuxt-link>
        <nuxt-link to="/authors">Authors</nuxt-link>
      </nav>
      <Search/>
    </div>
  </header>
</template>

<script>
import Search from '~/components/Search'

export default {
  components: {
    Search
  },

  computed: {
    meta () { return this.$store.state.meta }
  }
}
</script>

<style scoped lang="scss">
@import './assets/css/vars.scss';

header {
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.site-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 130%;
  margin-right: 32px;

  p {
    margin-top: 4px;
  }
}

a {
  color: #999;
  font-size: 80%;
  text-decoration: none;

  & + a {
    margin-left: 32px;
  }

  &.nuxt-link-active {
    padding-bottom: 4px;
    border-bottom: 2px solid lighten($primary, 40%);
  }
}

.outer-container {
  align-items: center;
  display: flex;
  margin: 0 auto;
  padding: 22px 0;
}
</style>
