<template>
  <section class="outer-container page">
    <h1 class="page-title">Topics</h1>
    <ul>
      <li v-for="topic in topics">
        <nuxt-link :to="`/topics/${topic.slug}`">
          <h2 v-html="topic.name"></h2>
          <span>({{ topic.count }})</span>
          <div v-html="topic.description"></div>
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
    topics () { return this.$store.state.topics }
  },

  async asyncData ({ store, params }) {
    if (!store.state.topics) {
      let topics = await axios.get(`${store.state.wordpressAPI}/wp/v2/categories?per_page=100`)
      store.commit('setTopics', topics.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  head () {
    return {
      title: `Topics | ${this.meta.name}`,
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
        display: inline-block;
        font-size: 1rem;
        margin-bottom: 4px;
        margin-top: 0;
      }

      span {
        color: lighten($primary, 15%);
        font-size: 0.8rem;
        margin-left: 4px;
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
