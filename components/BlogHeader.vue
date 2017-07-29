<template>
  <header>
    <div class="outer-container">
      <nuxt-link class="blog-title" to="/" exact><h1 v-html="meta.name"></h1></nuxt-link>
      <nav>
        <nuxt-link to="/" exact>Latest Articles</nuxt-link>
        <nuxt-link to="/topics">Topics</nuxt-link>
        <nuxt-link to="/authors">Authors</nuxt-link>
      </nav>
      <search/>
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

.blog-title {
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
  transition: color 0.1s, border-color 0.1s;

  & + a {
    margin-left: 32px;
  }

  &.nuxt-link-active:not(.blog-title) {
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
