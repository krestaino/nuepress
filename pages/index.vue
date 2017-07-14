<template>
  <section>
    <article v-for="post in posts">
      <nuxt-link :to="`/${post.slug}`">
        <img v-if="post._embedded['wp:featuredmedia']" :src="post._embedded['wp:featuredmedia'][0].source_url">
        <h1 v-html="post.title.rendered"></h1>
      </nuxt-link>
      <div>Written by <a :href="author.link" v-for="author in post._embedded.author" v-html="author.name"></a> on <span v-html="post.date"></span> under <span v-for="category in post._embedded['wp:term'][0]"><a :href="category.link" v-html="category.name"></a>&nbsp;</span></div>
      <!-- <p v-html="post.excerpt.rendered"></p> -->
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
    let { data } = await axios.get('https://wp.kmr.io/wp-json/wp/v2/posts?orderby=date&per_page=10&_embed')
    store.commit('setPosts', data)
  }
}
</script>

<style scoped>
section {
  max-width: 800px;
}

article {
  background-color: #efefef;
  border: 1px solid;
  padding: 32px;
}

article + article {
  margin-top: 32px;
}

img {
  max-width: 100%;
}

.more-link {
  display: none;
}
</style>
