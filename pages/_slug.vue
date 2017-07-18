<template>
  <section>
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
    post () { return this.$store.state.post },
    meta () { return this.$store.state.meta }
  },

  async fetch ({ store, params }) {
    let posts = await axios.get(`https://wp.kmr.io/wp-json/wp/v2/posts?slug=${params.slug}`)
    store.commit('setPost', posts.data[0])

    if (!store.state.meta) {
      let meta = await axios.get('https://wp.kmr.io/wp-json')
      store.commit('setMeta', meta.data)
    }
  },

  head () {
    return {
      title: `${this.post.title.rendered} | ${this.meta.name}`,
      meta: [
        { description: this.post.excerpt.rendered.replace(/(<([^>]+)>)/ig, '') } // strips html tags
      ]
    }
  }
}
</script>
