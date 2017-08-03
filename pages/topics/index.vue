<template>
  <div class="page">
    <div class="page-title">
      <h1>Topics</h1>
    </div>
    <ul>
      <li v-for="topic in topics" v-if="topic.slug !== 'featured'">
        <nuxt-link :to="`/topics/${topic.slug}`">
          <h2 v-html="topic.name"></h2>
          <div v-html="topic.description"></div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
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

  computed: {
    meta () { return this.$store.state.meta || {} },
    topics () { return this.$store.state.topics }
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

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

.page {
  background-color: #efefef;
  padding: 0 32px 64px 32px;

  @media (max-width: 700px) {
    padding: 0 16px 32px 16px;
  }

  ul {
    column-count: 3;
    column-gap: 64px;
    padding: 0;
    list-style: none;

    @media (max-width: 700px) {
      column-count: 2;
    }

    @media (max-width: 500px) {
      column-count: 1;
    }

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
