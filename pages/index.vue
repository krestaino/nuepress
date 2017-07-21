<template>
  <section>
    <article v-for="post in posts">
      <nuxt-link :to="`/${post.slug}`">
        <img v-if="post._embedded['wp:featuredmedia']" :src="post._embedded['wp:featuredmedia'][0].source_url">
        <h1 v-html="post.title.rendered"></h1>
      </nuxt-link>
      <div>Written by <nuxt-link :to="`/authors/${post._embedded.author[0].slug}`" v-html="post._embedded.author[0].name"></nuxt-link> on <span v-html="timestamp(post.date)"></span> under <span v-for="topic in post._embedded['wp:term'][0]"><nuxt-link :to="`/topics/${topic.slug}`" v-html="topic.name"></nuxt-link>&nbsp;</span></div>
      <div v-html="post.excerpt.rendered"></div>
    </article>
  </section>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  computed: {
    meta () { return this.$store.state.meta },
    posts () { return this.$store.state.posts }
  },

  methods: {
    timestamp (date) { return moment(date).format('MMMM d, YYYY') }
  },

  async asyncData ({ store, params }) {
    if (!store.state.posts) {
      let posts = await axios.get('https://wp.kmr.io/wp-json/wp/v2/posts?orderby=date&per_page=10&_embed')
      store.commit('setPosts', posts.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get('https://wp.kmr.io/wp-json')
      store.commit('setMeta', meta.data)
    }
  },

  head () {
    return {
      title: `Home | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/css/list.scss'
</style>
