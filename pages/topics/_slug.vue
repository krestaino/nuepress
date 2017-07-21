<template>
  <section>
    <article v-for="post in topicPosts.posts">
      <nuxt-link :to="`/${post.slug}`">
        <img v-if="post._embedded['wp:featuredmedia']" :src="post._embedded['wp:featuredmedia'][0].source_url">
        <h1 v-html="post.title.rendered"></h1>
      </nuxt-link>
      <div>Written by <nuxt-link :to="`/authors/${author.slug}`" v-for="author in post._embedded.author" v-html="author.name"></nuxt-link> on <span v-html="timestamp(post.date)"></span> under <span v-for="topic in post._embedded['wp:term'][0]"><nuxt-link :to="`/topics/${topic.slug}`" v-html="topic.name"></nuxt-link>&nbsp;</span></div>
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
    topics () { return this.$store.state.topics },
    topicPosts () { return _.find(this.$store.state.topicPosts, {'slug': this.$route.params.slug}) },
    meta () { return this.$store.state.meta }
  },

  methods: {
    timestamp (date) { return moment(date).format('MMMM d, YYYY') }
  },

  async asyncData ({ store, params }) {
    if (!store.state.topics) {
      let topics = await axios.get('https://wp.kmr.io/wp-json/wp/v2/categories?per_page=100')
      store.commit('setTopics', topics.data)
    }

    if (!_.find(store.state.topicPosts, {'slug': params.slug})) {
      let topic = _.find(store.state.topics, {'slug': params.slug})
      let topicPosts = await axios.get(`https://wp.kmr.io/wp-json/wp/v2/posts?orderby=date&per_page=10&categories=${topic.id}&_embed`)
      store.commit('setTopicPosts', {slug: params.slug, posts: topicPosts.data})
    }

    if (!store.state.meta) {
      let meta = await axios.get('https://wp.kmr.io/wp-json')
      store.commit('setMeta', meta.data)
    }
  },

  head () {
    return {
      title: ` | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
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
