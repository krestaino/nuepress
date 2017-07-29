<template>
  <section class="outer-container page">
    <div class="page-title">
      <h1>Authors</h1>
    </div>
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
  h1 {
    margin-top: 48px;
  }

  ul {
    column-count: 3;
    column-gap: 64px;
    padding: 0;
    list-style: none;

    li {
      break-inside: avoid;

      & + li {
        margin-top: 32px;
      }

      h2 {
        display: inline-block;
        font-family: 'Roboto', sans-serif;
        font-size: 1.3rem;
        margin-bottom: 4px;
        margin-top: 0;
        font-weight: 700;
      }

      span {
        color: lighten($primary, 15%);
        font-size: 0.8rem;
        margin-left: 4px;
      }

      a {
        color: #111;

        &:hover div {
          color: #111;
        }

        div {
          color: lighten($primary, 10%);
          margin-top: 8px;
          transition: 0.1s;
        }
      }
    }
  }
}
</style>

