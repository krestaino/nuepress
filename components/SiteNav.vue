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
  margin-right: 32px;

  h1 {
    color: #666;
    font-family: 'Roboto', sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
  }

  p {
    margin-top: 4px;
  }
}

a {
  color: #999;
  font-size: 0.85rem;
  text-decoration: none;
  transition: 0.1s;

  & + a {
    margin-left: 32px;
  }

  &.nuxt-link-active {
    padding-bottom: 4px;
    border-bottom: 2px solid;
    border-color: lighten($primary, 40%);
  }

  &:hover {
    color: #555;
    border-color: #555;
  }
}

.outer-container {
  align-items: center;
  display: flex;
  margin: 0 auto;
  padding: 22px 0;
}
</style>
