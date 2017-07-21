<template>
  <section>
    <article v-for="post in authorPosts.posts">
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
import _ from 'lodash'

export default {
  computed: {
    meta () { return this.$store.state.meta },
    author () { return _.find(this.$store.state.authors, {'slug': this.$route.params.slug}) },
    authorPosts () { return _.find(this.$store.state.authorPosts, {'slug': this.$route.params.slug}) },
    authors () { return this.$store.state.authors }
  },

  methods: {
    timestamp (date) { return moment(date).format('MMMM d, YYYY') }
  },

  async asyncData ({ store, params }) {
    if (!store.state.authors) {
      let authors = await axios.get('https://wp.kmr.io/wp-json/wp/v2/users?per_page=100')
      store.commit('setAuthors', authors.data)
    }

    if (!_.find(store.state.authorPosts, {'slug': params.slug})) {
      let author = _.find(store.state.authors, {'slug': params.slug})
      let authorPosts = await axios.get(`https://wp.kmr.io/wp-json/wp/v2/posts?orderby=date&per_page=10&author=${author.id}&_embed`)
      store.commit('setAuthorPosts', {slug: params.slug, posts: authorPosts.data})
    }

    if (!store.state.meta) {
      let meta = await axios.get('https://wp.kmr.io/wp-json')
      store.commit('setMeta', meta.data)
    }
  },

  head () {
    return {
      title: `${this.author.name} | ${this.meta.name}`,
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
