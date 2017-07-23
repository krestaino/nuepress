<template>
  <section class="outer-container">
    <h1 class="page-title" v-html="author.name"></h1>
    <p v-html="author.description"></p>
    <PostList :posts="authorPosts.posts"/>
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
    author () { return _.find(this.$store.state.authors, {'slug': this.$route.params.slug}) },
    authorPosts () { return _.find(this.$store.state.authorPosts, {'slug': this.$route.params.slug}) },
    authors () { return this.$store.state.authors }
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
