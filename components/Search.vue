<template>
  <div class="auto-suggest" v-on-click-outside="hideResults" :class="{ resultsVisible: (searchQuery.length > 0) && resultsVisible }">
    <button class="toggle-search" @click.prevent="toggleSearch">
      <img src="../assets/icons/ic_search_black_24px.svg">
    </button>
    <div class="input-container" ref="inputContainer" :class="{'searchOpen': searchOpen}">
      <input placeholder="Search articles" type="text" name="search" ref="searchQuery" v-model="searchQuery"
        @keyup.prevent="throttledSearch"
        @keydown.prevent.enter="enter"
        @keydown.prevent.down="down"
        @keydown.prevent.up="up"
        @focus="showResults">
      <button class="clear" @click.prevent="clearSearchQuery" v-if="searchQuery.length > 0">
        <img src="../assets/icons/ic_close_black_24px.svg">
      </button>
    </div>
    <ul class="results" v-if="(searchQuery.length > 0) && resultsVisible && articles.length">
      <li v-for="(article, index) in articles">
        <nuxt-link :to="`/${article.slug}`" :class="{'active': isActive(index)}" @mouseover.native="current = index">
          <span v-html="article.title.rendered"></span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'
import { mixin as onClickOutside } from 'vue-on-click-outside'
import axios from 'axios'

export default {
  mixins: [onClickOutside],

  data () {
    return {
      resultsVisible: false,
      searchOpen: false,
      searchQuery: '',
      articles: [],
      current: -1
    }
  },

  methods: {
    up () {
      if (this.current <= 0) {
        this.current = this.articles.length - 1
      } else {
        this.current--
      }
    },

    down () {
      if (this.current < this.articles.length - 1) {
        this.current++
      } else {
        this.current = 0
      }
    },

    enter () {
      document.querySelectorAll('.results li')[this.current].querySelector('a').click()
    },

    isActive (index) {
      return index === this.current
    },

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

    throttledSearch: _.throttle(function () {
      this.search()
    }, 350),

    toggleSearch () {
      this.searchOpen = !this.searchOpen
      this.$refs.searchQuery.focus()
      this.articles = []
      this.searchQuery = ''
    },

    search () {
      axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?search=${this.searchQuery}`)
        .then(response => {
          this.articles = response.data
          this.showResults()
        })
    }
  },

  watch: {
    '$route' () {
      this.current = -1
      this.searchQuery = ''
      this.searchOpen = false
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/css/vars.scss';

.auto-suggest {
  display: flex;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  margin-left: auto;
  position: relative;
  transition: 0.1s;

  &.resultsVisible {
    filter: drop-shadow(0px 0px 50px rgba(0,0,0,0.1));

    .input-container input {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }

  button {
    align-items: center;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;

    &:hover {
      img {
        opacity: 1;
      }
    }

    &.toggle-search {
      left: -40px;

      img {
        height: 24px;
        width: 24px;
      }
    }

    &.clear {
      border-left: 1px solid lighten($primary, 30%);
      padding: 12px;
      right: 0;
      top: 0;

      img {
        height: 16px;
        width: 16px;
      }
    }

    img {
      opacity: 0.5;
      transition: 0.1s;
    }
  }

  .input-container {
    overflow: hidden;
    transition: 0.5s;
    width: 0;
    will-change: width;

    &.searchOpen {
      width: 420px;
    }

    input {
      border: 1px solid lighten($primary, 30%);
      border-radius: 3px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      outline: 0;
      padding: 8px;
      font-family: 'Open Sans', sans-serif;
      font-size: 90%;
      transition: 0.1s;
      width: 100%;


      &::placeholder {
        color: lighten($primary, 30%);
      }

      &:focus {
        border-color: lighten($primary, 15%);

        & + .clear {
          border-color: lighten($primary, 15%);
        }

        &::placeholder {
          color: $primary;
        }
      }
    }
  }

  .results {
    background-color: #fff;
    border: 1px solid lighten($primary, 15%);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
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
        border-top: 1px dotted lighten($primary, 30%);
      }
    }

    a {
      color: $primary;
      display: block;
      font-size: 80%;
      padding: 16px 12px;
      transition: 0.1s;

      &.active {
        background-color: lighten($primary, 50%);
        color: darken($primary, 30%);
      }
    }
  }
}
</style>
