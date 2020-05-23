<template>
  <ul
    class="flex flex-col md:flex-row md:flex-wrap overflow-y-scroll md:overflow-y-hidden mb-32"
    v-if="searchQuery && apiResponse"
  >
    <li class="md:w-1/2" v-for="(article, index) in articles" :key="article.id">
      <nuxt-link
        :to="`/${article.slug}`"
        class="result-link flex flex-1 mt-3 p-2 rounded border border-transparent"
        :class="{ active: index === selectedIndex }"
        @mouseover.native="selectedIndex = index"
        @click.native="handleMenuClick(`/${article.slug}`)"
      >
        <div class="w-2/12 flex-shrink-0">
          <div class="lazy" v-if="article._embedded['wp:featuredmedia']">
            <img
              class="rounded"
              :alt="article._embedded['wp:featuredmedia'][0]"
              v-lazy="
                article._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url
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
</template>

<script>
import PhotoIcon from '~/assets/svg/Photo';

export default {
  components: {
    PhotoIcon
  },

  data() {
    return {
      selectedIndex: this.initialSelectedIndex
    };
  },

  props: {
    initialSelectedIndex: Number,
    apiResponse: Boolean,
    articles: Array,
    searchQuery: String
  },

  methods: {
    handleMenuClick(to) {
      if (this.$route.fullPath === to) {
        this.$store.commit('setHeader', { menuOpen: false, searchOpen: false });
      } else {
        this.$router.push({ path: to });
      }
    }
  },

  mixins: {
    longTimestamp: Function
  }
};
</script>

<style lang="scss" scoped>
.active {
  @apply bg-white border-gray-400;
}
.dark .result-link.active {
  @apply bg-gray-700 border-gray-600;
}
.lazy {
  @apply bg-transparent;
}
</style>
