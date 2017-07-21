<template>
  <section>
    <article v-for="post in topicPosts.posts">
      <nuxt-link :to="`/${post.slug}`">
        <img v-if="post._embedded['wp:featuredmedia']" :src="post._embedded['wp:featuredmedia'][0].source_url">
        <h1 v-html="post.title.rendered"></h1>
      </nuxt-link>
      <div>Written by <a :href="author.link" v-for="author in post._embedded.author" v-html="author.name"></a> on <span v-html="moment(post.date).format('MMMM d, YYYY')"></span> under <span v-for="category in post._embedded['wp:term'][0]"><a :href="category.link" v-html="category.name"></a>&nbsp;</span></div>
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
    topicPosts () { return _.find(this.$store.state.topicPosts, {'id': this.$route.params.id}) },
    meta () { return this.$store.state.meta }
  },

  data () {
    return {
      moment: moment
    }
  },

  async asyncData ({ store, params }) {
    if (!_.find(store.state.topicPosts, {'id': params.id})) {
      let topicPosts = await axios.get(`https://wp.kmr.io/wp-json/wp/v2/posts?orderby=date&per_page=10&categories=${params.id}&_embed`)
      store.commit('setTopicPosts', {id: params.id, posts: topicPosts.data})
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
