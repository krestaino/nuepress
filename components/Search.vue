<template>
  <div class="auto-suggest" v-on-click-outside="hideResults">
    <div class="input-container">
      <input placeholder="Search articles" type="text" name="search" v-model="searchQuery" @keyup="search" @focus="showResults">
    </div>
    <ul class="results" v-if="(searchQuery.length > 1) && resultsVisible">
      <li v-for="post in posts">
        <nuxt-link :to="post.slug">
          <span v-html="post.title.rendered"></span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mixin as onClickOutside } from 'vue-on-click-outside'

export default {
  mixins: [onClickOutside],

  data () {
    return {
      resultsVisible: false,
      searchQuery: '',
      posts: null
    }
  },

  methods: {
    hideResults () {
      this.resultsVisible = false
    },

    showResults () {
      this.resultsVisible = true
    },

    search () {
      if (this.searchQuery.length > 1) {
        axios.get(`https://wp.kmr.io/wp-json/wp/v2/posts?search=${this.searchQuery}`)
          .then(response => {
            this.posts = response.data
            this.showResults()
          })
      }
    }
  },

  watch: {
    '$route' () {
      this.searchQuery = ''
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/css/vars.scss';

.auto-suggest {
  margin-left: auto;
  position: relative;

  .input-container {
    padding: 0 12px;

    input {
      border: 1px solid lighten($primary, 20%);
      outline: 0;
      padding: 8px;
      font-family: 'Open Sans', sans-serif;
      font-size: 90%;
      min-width: 300px;
      width: 100%;

      &:focus {
        border-color: darken($primary, 20%);
      }
    }
  }

  .results {
    background-color: #fff;
    padding: 0 12px;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 10;

    li {
      line-height: 1.2;
      padding: 12px 0;

      & + li {
        border-top: 1px solid lighten($primary, 30%);
      }
    }

    a {
      color: $primary;
      font-size: 80%;

      &:hover {
        color: darken($primary, 30%)
      }
    }
  }
}
</style>
