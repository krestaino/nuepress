<template>
  <main class="outer-container page">
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
  </main>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    authors () { return this.$store.state.authors },
    meta () { return this.$store.state.meta }
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

main.page {
  background-color: #efefef;
  padding: 0 32px 64px 32px;

  ul {
    column-count: 3;
    column-gap: 64px;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      flex-direction: column;
      page-break-inside: avoid;
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
        font-weight: 400;
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

