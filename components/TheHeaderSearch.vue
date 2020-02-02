<template>
  <section
    role="search"
    ref="autoSuggest"
    :key="$store.state.searchOpen"
    class="absolute top-0 left-0 w-full h-full top-12 font-sans flex flex-col"
  >
    <div class="flex relative" ref="inputContainer">
      <label class="hidden" for="search">Search</label>
      <input
        class="rounded bg-white w-full px-3 py-2 border-l border-r border-gray-400 dark:border-gray-600"
        id="search"
        name="search"
        placeholder="Search articles"
        ref="searchQuery"
        type="text"
        v-model="searchQuery"
        @keyup.prevent="search()"
        @keydown.prevent.enter="enter"
        @keydown.prevent.down="down"
        @keydown.prevent.up="up"
        @blur="searchBlur"
      />
      <transition name="fade">
        <Spinner2 class="spinner-2 absolute right-0 top-0 p-4" v-if="spinnerVisible" />
      </transition>
    </div>
    <transition name="fade">
      <ul class="results" v-if="searchQuery && resultsVisible && apiResponse">
        <li
          ref="result"
          v-for="(article, index) in articles"
          :key="article.id"
          v-if="$route.params.article != article.slug"
        >
          <nuxt-link
            :to="`/${article.slug}`"
            class="flex mt-3"
            :class="{ active: selectedResult(index) }"
            @mouseover.native="current = index"
          >
            <div class="w-2/12 flex-shrink-0">
              <div class="lazy" v-if="article._embedded['wp:featuredmedia']">
                <img
                  class="rounded"
                  :alt="article._embedded['wp:featuredmedia'][0]"
                  v-lazy="
                    article._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail
                      .source_url
                  "
                />
              </div>
              <PhotoIcon
                v-else
                class="w-full h-full p-3 bg-white text-gray-500 dark:text-red-500 rounded"
              />
            </div>
            <div class="pl-3">
              <span class="font-bold" v-html="article.title.rendered"></span>
              <div class="meta">
                <span v-html="longTimestamp(article.date)"></span>&nbsp;–&nbsp;<span
                  class="topic"
                  v-for="topic in article._embedded['wp:term'][0]"
                  :key="topic.id"
                  v-html="topic.name"
                  v-if="topic.slug !== 'featured'"
                ></span>
              </div>
            </div>
          </nuxt-link>
        </li>
        <li class="no-results" v-if="searchQuery && articles.length === 0 && apiResponse">
          No results found
        </li>
      </ul>
    </transition>

    <div
      class="shade"
      @click.prevent="resultsVisible = false"
      :class="{ 'results-visible': searchQuery && resultsVisible }"
    ></div>
  </section>
</template>

<script>
import debounce from 'lodash/debounce';
import axios from 'axios';
import Spinner2 from '~/components/Spinner2';
import PhotoIcon from '~/assets/svg/Photo';

export default {
  mixins: {
    longTimestamp: Function
  },

  components: {
    PhotoIcon,
    Spinner2
  },

  data() {
    return {
      apiResponse: false,
      articles: [],
      current: -1,
      resultsVisible: false,
      searchOpen: false,
      searchQuery: '',
      spinnerVisible: false
    };
  },

  methods: {
    debounceSearch: debounce(function(event) {
      if (event.keyCode !== 13 && event.keyCode !== 38 && event.keyCode !== 40) {
        this.search();
      }
    }, 200),

    down() {
      this.current < this.articles.length - 1 ? this.current++ : (this.current = 0);
    },

    enter() {
      this.$refs.result[this.current].querySelector('a').click();
    },

    search() {
      this.spinnerVisible = true;

      axios
        .get(
          `${process.env.WORDPRESS_API_URL}/wp/v2/posts?search=${this.searchQuery}&_embed&per_page=8`
        )
        .then(response => {
          this.apiResponse = true;
          this.spinnerVisible = false;
          this.articles = response.data;
          this.resultsVisible = true;
        });
    },

    searchBlur() {
      if (!this.searchQuery) {
        this.searchOpen = false;
      }
    },

    selectedResult(index) {
      return index === this.current;
    },

    toggleSearch() {
      this.$store.commit('toggleSearch');
      this.$refs.searchQuery.focus();
      this.resultsVisible = !this.resultsVisible;
      this.searchOpen = !this.searchOpen;
    },

    up() {
      this.current <= 0 ? (this.current = this.articles.length - 1) : this.current--;
    }
  },

  watch: {
    $route() {
      this.apiResponse = false;
      this.current = -1;
      this.searchQuery = '';
      this.searchOpen = false;
      this.resultsVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
