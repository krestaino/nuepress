<template>
  <section class="outer-container">
    <h1 class="page-title">Authors</h1>
    <ul>
      <li v-for="author in authors">
        <nuxt-link :to="`/authors/${author.slug}`">
          <span v-html="author.name"></span>
          <p v-html="author.description"></p>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    meta () { return this.$store.state.meta },
    authors () { return this.$store.state.authors }
  },

  async asyncData ({ store, params }) {
    if (!store.state.authors) {
      let authors = await axios.get('https://wp.kmr.io/wp-json/wp/v2/users?per_page=100')
      store.commit('setAuthors', authors.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get('https://wp.kmr.io/wp-json')
      store.commit('setMeta', meta.data)
    }
  },

  head () {
    return {
      title: `authors | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  }
}
</script>

<style scoped>
ul {
  padding: 0;
  list-style: none;
}
</style>
