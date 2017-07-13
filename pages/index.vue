<template>
  <section>
    <article v-for="post in posts">
      <h1 v-html="post.title.rendered"></h1>
      <p v-html="post.excerpt.rendered"></p>
      <a :href="`post/${post.id}`">Continue reading</a>
    </article>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    posts () { return this.$store.state.posts }
  },

  async fetch ({ store, params }) {
    let { data } = await axios.get('https://wp.kmr.io/wp-json/wp/v2/posts?orderby=date&per_page=10')
    store.commit('setPosts', data)
  }
}
</script>

<style>
article + article {
  margin-top: 32px;
}

.more-link {
  display: none;
}
</style>
