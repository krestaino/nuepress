<template>
  <section class="outer-container">
    <h1 class="page-title">Topics</h1>
    <ul>
      <li v-for="topic in topics" :key="topic.id">
        <nuxt-link :to="`/topics/${topic.slug}`">
          {{ topic.name }} <span>({{ topic.count }})</span>
        </nuxt-link>
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
      let topics = await axios.get('https://wp.kmr.io/wp-json/wp/v2/categories?per_page=100')
      store.commit('setTopics', topics.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get('https://wp.kmr.io/wp-json')
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

ul {
  column-count: 4;
  column-gap: 64px;
  padding: 0;
  list-style: none;

  li {
    break-inside: avoid-column;
    
    & + li {
      margin-top: 16px;
    }

    a {
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
    }
  }
}
</style>
