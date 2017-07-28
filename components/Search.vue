<template>
  <div class="auto-suggest" v-on-click-outside="hideResults" :class="{ resultsVisible: (searchQuery.length > 0) && resultsVisible }">
    <div class="input-container">
      <input placeholder="Search articles" type="text" name="search" ref="searchQuery" v-model="searchQuery" @keyup="search" @focus="showResults">
      <button class="clear" @click.prevent="clearSearchQuery" v-if="searchQuery.length > 0">
        <img src="../assets/icons/ic_close_black_24px.svg">
      </button>
    </div>
    <ul class="results" v-if="(searchQuery.length > 0) && resultsVisible && posts.length">
      <li v-for="post in posts">
        <nuxt-link :to="`/${post.slug}`">
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
      posts: []
    }
  },

  methods: {
    clearSearchQuery () {
      this.searchQuery = ''
      this.$refs.searchQuery.focus()
    },

    hideResults () {
      this.resultsVisible = false
    },

    showResults () {
      this.resultsVisible = true
    },

    search () {
      axios.get(`${this.$store.state.wpAPI}/wp/v2/posts?search=${this.searchQuery}`)
        .then(response => {
          this.posts = response.data
          this.showResults()
        })
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
  transition: 0.1s;

  &.resultsVisible {
    filter: drop-shadow(0px 0px 50px rgba(0,0,0,0.1));
  }

  .input-container {
    input {
      border: 1px solid lighten($primary, 20%);
      outline: 0;
      padding: 8px;
      font-family: 'Open Sans', sans-serif;
      font-size: 90%;
      min-width: 320px;
      transition: 0.1s;
      width: 100%;

      &::placeholder {
        color: lighten($primary, 30%);
      }

      &:focus {
        border-color: $primary;

        & + .clear {
          border-color: $primary;
        }

        &::placeholder {
          color: $primary;
        }
      }
    }

    .clear {
      align-items: center;
      background-color: transparent;
      border: 0;
      border-left: 1px solid lighten($primary, 20%);
      cursor: pointer;
      display: flex;
      height: 100%;
      justify-content: center;
      padding: 12px;
      position: absolute;
      right: 0;
      top: 0;

      &:hover {
        img {
          opacity: 1;
        }
      }

      img {
        height: 16px;
        opacity: 0.5;
        transition: 0.1s;
        width: 16px;
      }
    }
  }

  .results {
    background-color: #fff;
    border: 1px solid $primary;
    border-top: 0;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 100%;
    transition: 0.1s;
    width: 100%;
    z-index: 10;

    li {
      line-height: 1.2;

      & + li {
        border-top: 1px dotted lighten($primary, 20%);
      }
    }

    a {
      color: $primary;
      display: block;
      font-size: 80%;
      padding: 16px 12px;
      transition: 0.1s;

      &:hover {
        background-color: lighten($primary, 50%);
        color: darken($primary, 30%)
      }
    }
  }
}
</style>
