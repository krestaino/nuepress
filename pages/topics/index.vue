<template>
  <section class="outer-container page">
    <h1 class="page-title">Topics</h1>
    <ul>
      <li v-for="topic in topics" :key="topic.id">
        <h2>
          <nuxt-link :to="`/topics/${topic.slug}`">
            {{ topic.name }} <span>({{ topic.count }})</span>
          </nuxt-link>
        </h2>
        <p v-html="topic.description"></p>
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
      let topics = await axios.get(`${store.state.wpAPI}/wp/v2/categories?per_page=100`)
      store.commit('setTopics', topics.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wpAPI)
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
