<template>
  <main class="outer-container">
    <div>
      <PostList :posts="posts"/>
      <button @click="morePosts">More Posts</button>
    </div>
    <aside>
      <ul>
        <li>Tag 1</li>
      </ul>
    </aside>
  </main>
</template>

<script>
import axios from 'axios'
import PostList from '~/components/PostList'

export default {
  components: {
    PostList
  },

  data () {
    return {
      page: 1
    }
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

  methods: {
    morePosts () {
      this.page++

      axios.get(`https://wp.kmr.io/wp-json/wp/v2/posts?orderby=date&per_page=10&_embed&page=${this.page}`)
        .then(response => {
          this.$store.commit('setPosts', response.data)
        })
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
  display: flex;
  padding-top: 32px;

  aside {
    background-color: #fff;
    margin-left: 32px;
    max-width: 460px;
    padding: 32px;
    width: 100%;
  }
}
</style>
