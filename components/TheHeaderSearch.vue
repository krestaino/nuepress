<template>
  <section id="search" role="search" ref="autoSuggest" :class="{'search-open': searchOpen}">
    <button class="toggle-search" title="Search" @click.prevent="toggleSearch">
      <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" :class="{ 'results-visible': searchQuery && resultsVisible }">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
    <div class="inner-container" :class="{ 'results-visible': resultsVisible && searchQuery }">
      <div class="input-container" ref="inputContainer">
        <input name="search" placeholder="Search articles" ref="searchQuery" type="text" v-model="searchQuery"
          @keyup.prevent="debounceSearch($event)"
          @keydown.prevent.enter="enter"
          @keydown.prevent.down="down"
          @keydown.prevent.up="up"
          @blur="searchBlur"
          @focus="resultsVisible = true">
        <div class="float-right">
          <transition name="fade">
            <Spinner2
              class="spinner-2"
              v-if="spinnerVisible"
            />
          </transition>
          <button class="clear" @click.prevent="clearSearchQuery" v-if="searchQuery">
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
        </div>
      </div>
      <transition name="fade">
        <ul class="results" v-if="searchQuery && resultsVisible && apiResponse">
          <li ref="result" v-for="(article, index) in articles" :key="article.id" v-if="$route.params.article != article.slug">
            <nuxt-link :to="`/${article.slug}`" class="row" :class="{'active': selectedResult(index)}" @mouseover.native="current = index">
              <div class="col thumb">
                <div class="lazy" v-if="article._embedded['wp:featuredmedia']">
                  <img v-lazy="article._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url">
                </div>
                <svg v-else fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 24H0V0h24v24z" fill="none"/>
                  <path d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"/>
                </svg>
              </div>
              <div class="col copy">
                <span class="title" v-html="article.title.rendered"></span>
                <div class="meta">
                  <span v-html="longTimestamp(article.date)"></span>&nbsp;–&nbsp;<span class="topic" v-for="topic in article._embedded['wp:term'][0]" :key="topic.id" v-html="topic.name" v-if="topic.slug !== 'featured'"></span>
                </div>
              </div>
            </nuxt-link>
          </li>
          <li class="no-results" v-if="searchQuery && (articles.length === 0) && (apiResponse)">No results found</li>
        </ul>
      </transition>
    </div>
    <div class="shade" @click.prevent="resultsVisible = false" :class="{ 'results-visible': searchQuery && resultsVisible }"></div>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'
import axios from 'axios'
import Spinner2 from '~/components/Spinner2'

export default {
  mixins: {
    longTimestamp: Function
  },

  components: {
    Spinner2
  },

  data () {
    return {
      apiResponse: false,
      articles: [],
      current: -1,
      resultsVisible: false,
      searchOpen: false,
      searchQuery: '',
      spinnerVisible: false
    }
  },

  methods: {
    debounceSearch: debounce(function (event) {
      if (event.keyCode !== 13 && event.keyCode !== 38 && event.keyCode !== 40) {
        this.search()
      }
    }, 200),

    down () {
      (this.current < this.articles.length - 1)
        ? this.current++
        : this.current = 0
    },

    enter () {
      this.$refs.result[this.current].querySelector('a').click()
    },

    clearSearchQuery () {
      this.searchQuery = ''
      this.$refs.searchQuery.focus()
    },

    search () {
      this.spinnerVisible = true

      axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?search=${this.searchQuery}&_embed&per_page=8`)
        .then(response => {
          this.apiResponse = true
          this.spinnerVisible = false
          this.articles = response.data
          this.resultsVisible = true
        })
    },

    searchBlur () {
      if (!this.searchQuery) {
        this.searchOpen = false
      }
    },

    selectedResult (index) {
      return index === this.current
    },

    toggleSearch () {
      this.$refs.searchQuery.focus()
      this.resultsVisible = !this.resultsVisible
      this.searchOpen = !this.searchOpen
    },

    up () {
      (this.current <= 0)
        ? this.current = this.articles.length - 1
        : this.current--
    }
  },

  watch: {
    '$route' () {
      this.apiResponse = false
      this.current = -1
      this.searchQuery = ''
      this.searchOpen = false
      this.resultsVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

section {
  margin-left: auto;

  &.search-open {
    @media (max-width: 700px) {
      top: 100%;
      z-index: -1;
    }
  }

  @media (max-width: 700px) {
    margin: 0;
    position: absolute;
    right: 0;
    top: -100%;
    transition: top 0.5s, z-index .2s 0.5s;
    width: 100%;
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
      svg {
        opacity: 1;
      }
    }

    &.toggle-search {
      left: -32px;
      height: 100%;
      justify-content: flex-end;
      width: 32px;

      @media (max-width: 700px) {
        height: 32px;
        position: fixed;
        left: initial;
        right: 12px;
        top: 12px;
      }

      svg {
        height: 24px;
        width: 24px;
      }
    }

    &.clear {
      border-left: 1px solid lighten($primary, 30%);
      padding: 0 12px;
      right: 0;
      top: 0;

      @media (max-width: 700px) {
        padding: 0 20px;
      }

      svg {
        height: 16px;
        width: 16px;
      }
    }

    svg {
      opacity: 0.5;
      transition: 0.1s;
    }
  }
}

.inner-container {
  display: flex;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  position: relative;
  transition: 0.1s;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: row-reverse;
    margin-left: auto;
    width: 100%;
  }

  &.results-visible {
    .input-container input {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }

  .input-container {
    overflow: hidden;
    transition: width 0.3s cubic-bezier(.11,.89,.31,.99);
    width: 0;
    will-change: width;

    section.search-open & {
      width: 476px;

      @media (max-width: 700px) {
        width: 100%;
      }
    }

    @media (max-width: 700px) {
      width: 100%;
    }

    .float-right {
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

      @media (max-width: 700px) {
        border-left: 0;
        border-radius: 0px;
        border-right: 0;
        padding: 16px;
      }

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
    left: 0;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 100%;
    transition: 0.1s;
    width: 100%;

    @media (max-width: 700px) {
      border-left: 0;
      border-right: 0;
    }

    .no-results {
      padding: 16px 12px;
    }

    li {
      line-height: 1.2;

      & + li {
        border-top: 1px dotted lighten($primary, 30%);
      }

      @media (min-width: 700px) {
        &:nth-child(8) {
          @media (max-height: 900px) {
            display: none;
          }
        }

        &:nth-child(7) {
          @media (max-height: 800px) {
            display: none;
          }
        }

        &:nth-child(6) {
          @media (max-height: 720px) {
            display: none;
          }
        }
      }

      .row {
        display: flex;
      }

      // https://stackoverflow.com/a/13924997
      .title,
      .meta {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      .title {
        font-weight: 700;
        line-height: 18px;
        max-height: 36px;
        -webkit-line-clamp: 2;

        @media (max-width: 720px) {
            font-weight: normal;
          }
      }

      .meta {
        font-family: 'Roboto', sans-serif;
        font-size: 0.75rem;
        font-weight: 400;
        margin-top: 8px;
        line-height: 18px;
        max-height: 18px;
        -webkit-line-clamp: 1;

        @media (max-width: 700px) {
          display: none;
        }

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

        .thumb {
          img,
          svg {
            display: block;
            height: 96px;
            max-width: 100%;
            width: 96px;

            @media (max-width: 700px) {
              height: 32px;
              width: 32px;
            }
          }

          svg {
            background-color: #f1f1f1;
            fill: #ccc;
            padding: 32px;

            @media (max-width: 700px) {
              padding: 8px;
            }
          }

          @media (max-width: 700px) {
            padding: 16px 0 16px 12px;
            width: calc(32px + 12px)
          }
        }

        .copy {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          padding: 16px 12px;
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
  z-index: -2;

  @media (max-width: 700px) {
    top: 60px;
  }

  &:hover {
    opacity: 0;
  }

  &.results-visible {
    opacity: 1;
    visibility: visible;
  }
}
</style>
