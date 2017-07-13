<template>
  <section>
    <a href="/">Home</a>
    <article>
      <h1 v-html="post.title.rendered"></h1>
      <div v-html="post.content.rendered"></div>
    </article>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },

  computed: {
    post () { return this.$store.state.post }
  },

  async fetch ({ store, params }) {
    let { data } = await axios.get(`https://wp.kmr.io/wp-json/wp/v2/posts/${params.id}`)
    store.commit('setPost', data)
  }
}
</script>
