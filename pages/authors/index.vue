<template>
  <section class="outer-container page">
    <h1 class="page-title">Authors</h1>
    <ul>
      <li v-for="author in authors">
        <h2>
          <nuxt-link :to="`/authors/${author.slug}`">
            {{ author.name }}
          </nuxt-link>
        </h2>
        <p v-html="author.description"></p>
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

<style lang="scss">
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
        margin-top: 16px;
      }

      h2 {
        font-size: 1.1rem;
        margin-bottom: 8px;
        margin-top: 0;
      }

      a {
        color: #111;
        font-family: 'Roboto', sans-serif;

        span {
          color: lighten($primary, 10%);
          display: inline-block;
          font-size: 70%;
          position: relative;
          top: -1px;
        }
      }

      p {
        color: lighten($primary, 10%);
        font-size: 80%;
        margin-top: 0;
      }
    }
  }
}
</style>
