<template>
  <header>
    <div class="outer-container" v-if="meta">
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

  data () {
    return {
      navShrinkActive: false
    }
  },

  computed: {
    meta () { return this.$store.state.meta }
  }
}
</script>

<style scoped lang="scss">
@import './assets/css/vars.scss';

header {
  font-family: 'Roboto', sans-serif;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;

  .outer-container {
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
    background-color: #fff;
    display: flex;
    height: 80px;
    margin: 0 auto;
    padding: 0 32px;
    transition: padding-top 0.5s, padding-bottom 0.5s;
  }

  .blog-title {
    margin-right: 32px;

    h1 {
      color: #666;
      font-size: 1.1rem;
      font-weight: 400;
    }

    p {
      margin-top: 4px;
    }
  }

  a {
    border-color: lighten($primary, 40%);
    color: #999;
    font-size: 0.9rem;
    font-weight: 300;
    text-decoration: none;
    transition: color 0.1s, border-color 0.1s;

    & + a {
      margin-left: 32px;
    }

    &.nuxt-link-active:not(.blog-title) {
      padding-bottom: 4px;
      border-bottom: 2px solid;
    }

    &:hover {
      color: #555;
      border-color: #555;
    }
  }
}
</style>
