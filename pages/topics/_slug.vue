<template>
  <section class="outer-container">
    <h1 class="page-title" v-html="topic.name"></h1>
    <p v-html="topic.description"></p>
    <PostList :posts="currentTopicPosts.posts"/>
  </section>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import PostList from '~/components/PostList'

export default {
  components: {
    PostList
  },

  computed: {
    meta () { return this.$store.state.meta },
    topic () { return _.find(this.$store.state.topics, {'slug': this.$route.params.slug}) },
    currentTopicPosts () { return _.find(this.$store.state.topicPosts, {'slug': this.$route.params.slug}) },
    topics () { return this.$store.state.topics }
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
      title: `${this.topic.name} | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/css/vars.scss';

h1 {
  margin-bottom: 4px;
}

p {
  margin-bottom: 32px;
}
</style>
