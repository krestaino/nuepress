<template>
  <section>
    <nuxt-link to="/">Home</nuxt-link>
    <article>
      <h1 v-html="post.title.rendered"></h1>
      <div v-html="post.content.rendered"></div>
    </article>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    post () { return this.$store.state.post }
  },

  async fetch ({ store, params }) {
    let { data } = await axios.get(`https://wp.kmr.io/wp-json/wp/v2/posts?slug=${params.slug}`)
    store.commit('setPost', data[0])
  }
}
</script>
