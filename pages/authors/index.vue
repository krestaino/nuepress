<template>
  <section class="outer-container page">
    <h1 class="page-title">Authors</h1>
    <ul>
      <li v-for="author in authors">
        <nuxt-link :to="`/authors/${author.slug}`">
          <h2 v-html="author.name"></h2>
          <div v-html="author.description"></div>
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
      let authors = await axios.get(`${store.state.wordpressAPI}/wp/v2/users?per_page=100`)
      store.commit('setAuthors', authors.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  head () {
    return {
      title: `Authors | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/css/vars.scss';

section.page {
  ul {
    column-count: 3;
    column-gap: 32px;
    padding: 0;
    list-style: none;

    li {
      break-inside: avoid;

      & + li {
        margin-top: 24px;
      }

      h2 {
        font-size: 1rem;
        margin-bottom: 4px;
        margin-top: 0;
      }

      a {
        color: #111;
        font-family: 'Roboto', sans-serif;

        &:hover div {
          color: #111;
        }

        div {
          color: lighten($primary, 10%);
          font-size: 80%;
          margin-top: 0;
          transition: 0.1s;
        }
      }
    }
  }
}
</style>
