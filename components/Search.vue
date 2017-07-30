<template>
  <div class="auto-suggest">
    <div class="inner-container" v-on-click-outside="hideResults" :class="{ 'results-visible': (searchQuery.length > 0) && resultsVisible }">
      <button class="toggle-search" @click.prevent="toggleSearch">
        <img src="../assets/icons/ic_search_black_24px.svg">
      </button>
      <div class="input-container" ref="inputContainer" :class="{'search-open': searchOpen}">
        <input placeholder="Search articles" type="text" name="search" ref="searchQuery" v-model="searchQuery"
          @keyup.prevent="debounceSearch($event)"
          @keydown.prevent.enter="enter"
          @keydown.prevent.down="down"
          @keydown.prevent.up="up"
          @focus="showResults">
        <div class="right">
          <transition name="fade">
            <spinner-2 class="spinner-2" v-if="spinnerVisible"></spinner-2>
          </transition>
          <button class="clear" @click.prevent="clearSearchQuery" v-if="searchQuery.length > 0">
            <img src="../assets/icons/ic_close_black_24px.svg">
          </button>
        </div>
      </div>
      <ul class="results" v-if="(searchQuery.length > 0) && resultsVisible && apiResponse">
        <li v-for="(article, index) in articles">
          <nuxt-link :to="`/${article.slug}`" class="row" :class="{'active': isActive(index)}" @mouseover.native="current = index">
            <div class="col">
              <img v-if="article._embedded['wp:featuredmedia']" :src="article._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url">
            </div>
            <div class="col copy">
              <span class="title" v-html="article.title.rendered"></span>
              <div class="meta">
                <span v-html="timestamp(article.date)"></span>&nbsp;–&nbsp;<span class="topic" v-for="topic in article._embedded['wp:term'][0]" :key="topic.id" v-html="topic.name"></span>
              </div>
            </div>
          </nuxt-link>
        </li>
        <li class="no-results" v-if="(searchQuery.length > 0) && (articles.length === 0) && (apiResponse)">No results found</li>
      </ul>
    </div>
    <div class="shade" @click.prevent="hideResults" :class="{ 'results-visible': (searchQuery.length > 0) && resultsVisible }"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mixin as onClickOutside } from 'vue-on-click-outside'
import axios from 'axios'
import moment from 'moment'
import Spinner2 from '~/components/Spinner2'

export default {
  components: {
    Spinner2
  },

  mixins: [onClickOutside],

  data () {
    return {
      apiResponse: false,
      resultsVisible: false,
      searchOpen: false,
      searchQuery: '',
      spinnerVisible: false,
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

    timestamp (date) {
      return moment(date).format('MMM d, YYYY')
    },

    debounceSearch: _.debounce(function (event) {
      if (event.keyCode !== 13 && event.keyCode !== 38 && event.keyCode !== 40) {
        this.search()
      }
    }, 200),

    toggleSearch () {
      this.searchOpen = !this.searchOpen
      this.$refs.searchQuery.focus()
      this.articles = []
      this.searchQuery = ''
    },

    search () {
      this.spinnerVisible = true
      axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?search=${this.searchQuery}&_embed`)
        .then(response => {
          this.apiResponse = true
          this.spinnerVisible = false
          this.articles = response.data
          this.showResults()
        })
    }
  },

  watch: {
    '$route' () {
      this.apiResponse = false
      this.current = -1
      this.searchQuery = ''
      this.searchOpen = false
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/css/vars.scss';

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

.auto-suggest {
  margin-left: auto;
  z-index: 1;
}

.inner-container {
  display: flex;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  position: relative;
  transition: 0.1s;
  z-index: 2;

  &.results-visible {
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
      left: -32px;
      height: 100%;
      width: 32px;

      img {
        height: 24px;
        width: 24px;
      }
    }

    &.clear {
      border-left: 1px solid lighten($primary, 30%);
      padding: 0 12px;
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
    transition: width 0.3s cubic-bezier(.11,.89,.31,.99);
    width: 0;
    will-change: width;

    &.search-open {
      width: 476px;
    }

    .right {
      align-items: center;
      display: flex;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;

      .clear {
        position: relative;
      }

      .spinner-2 {
        margin-right: 8px;
      }
    }

    

    input {
      border: 1px solid lighten($primary, 30%);
      border-radius: 3px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      outline: 0;
      padding: 8px 12px;
      font-family: 'Open Sans', sans-serif;
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

    .no-results {
      padding: 16px 12px;
    }

    li {
      line-height: 1.2;

      & + li {
        border-top: 1px dotted lighten($primary, 30%);
      }

      &:nth-last-child(-n+1) {
        @media (max-height: 900px) {
          display: none;
        }
      }

      &:nth-last-child(-n+2) {
        @media (max-height: 800px) {
          display: none;
        }
      }

      &:nth-last-child(-n+3) {
        @media (max-height: 720px) {
          display: none;
        }
      }

      .row {
        display: flex;
      }

      .title {
        font-weight: 700;
      }

      .meta {
        font-family: 'Roboto', sans-serif;
        font-size: 0.75rem;
        font-weight: 400;
        margin-top: 8px;

        .topic + .topic {
          margin-left: 8px;
        }

        .topic + .topic::before {
          content: ', ';
          color: $primary;
          left: -7px;
          position: absolute;
        }
      }

      a {
        color: $primary;
        display: block;
        font-size: 80%;
        transition: 0.1s;

        &.active {
          background-color: lighten($primary, 70%);
          color: darken($primary, 30%);
        }

        .copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 16px 12px;
        }

        img {
          display: block;
          height: 75px;
          width: 75px;
        }
      }
    }    
  }
}

.shade {
  background-color: rgba(#000, .5);
  content: '';
  height: 100%;
  left: 0;
  opacity: 0;
  position: fixed;
  top: 0;
  transition: 0.5s;
  visibility: hidden;
  width: 100%;
  z-index: -1;

  &:hover {
    opacity: 0;
  }

  &.results-visible {
    opacity: 1;
    visibility: visible;
  }
}
</style>
