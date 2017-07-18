<template>
  <section>
    <li v-for="topic in topics">
      <nuxt-link :to="`/topics/${topic.slug}`">
        <h2 v-html="topic.name"></h2>
        <p v-html="topic.description"></p>
      </nuxt-link>
    </li>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    topics () { return this.$store.state.topics }
  },

  async asyncData ({ store, params }) {
    if (!store.state.topics) {
      let topics = await axios.get('https://wp.kmr.io/wp-json/wp/v2/categories')
      store.commit('setTopics', topics.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get('https://wp.kmr.io/wp-json')
      store.commit('setMeta', meta.data)
    }
  }
}
</script>

<style scoped>

</style>
