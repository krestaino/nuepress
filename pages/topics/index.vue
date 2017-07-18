<template>
  <section>
    <ul>
      <li v-for="topic in topics">
        <nuxt-link :to="`/topics/${topic.slug}`">
          <span v-html="topic.name"></span>
          <p v-html="topic.description"></p>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    topics () { return this.$store.state.topics },
    meta () { return this.$store.state.meta }
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

<style scoped>
ul {
  padding: 0;
  list-style: none;
}
</style>
