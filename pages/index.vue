<template>
  <main class="outer-container">
    <PostList :posts="posts"/>
  </main>
</template>

<script>
import axios from 'axios'
import PostList from '~/components/PostList'

export default {
  components: {
    PostList
  },

  computed: {
    meta () { return this.$store.state.meta },
    posts () { return this.$store.state.posts }
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
main {
  margin-top: 32px;
}
</style>
