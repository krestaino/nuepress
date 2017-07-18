<template>
  <section>
    <li v-for="category in categories">
      <nuxt-link :to="`/category/${category.aciform}`">
        <h2 v-html="category.name"></h2>
        <p v-html="category.description"></p>
      </nuxt-link>
    </li>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    categories () { return this.$store.state.categories }
  },

  async asyncData ({ store, params }) {
    if (!store.state.categories) {
      let categories = await axios.get('https://wp.kmr.io/wp-json/wp/v2/categories')
      store.commit('setCategories', categories.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get('https://wp.kmr.io/wp-json')
      store.commit('setMeta', meta.data)
    }
  }
}
</script>

<style scoped>

</style>
