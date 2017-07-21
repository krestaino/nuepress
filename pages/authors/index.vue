<template>
  <section>
    <ul>
      <li v-for="user in users">
        <nuxt-link :to="`/users/${user.slug}`">
          <span v-html="user.name"></span>
          <p v-html="user.description"></p>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    users () { return this.$store.state.users },
    meta () { return this.$store.state.meta }
  },

  async asyncData ({ store, params }) {
    if (!store.state.users) {
      let users = await axios.get('https://wp.kmr.io/wp-json/wp/v2/users?per_page=100')
      store.commit('setUsers', users.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get('https://wp.kmr.io/wp-json')
      store.commit('setMeta', meta.data)
    }
  },

  head () {
    return {
      title: `users | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  }
}
</script>

<style scoped>
ul {
  padding: 0;
  list-style: none;
}
</style>
