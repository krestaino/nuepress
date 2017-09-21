<template>
  <div class="topic">
    <div class="articles">
      <div class="page-title">
        <h1 v-html="topic.name"></h1>
        <p v-html="topic.description" v-if="topic.description"></p>
      </div>
      <ArticleList :articles="topicArticles.articles"></ArticleList>
      <InfiniteLoading v-if="(topicArticles.infiniteLoading)  && (topicArticles.articles.length >= 10)" :on-infinite="moreArticles" ref="infiniteLoading"/>
    </div>
    <Sidebar :featuredArticles="featuredArticles"></Sidebar>
  </div>
</template>

<script>
import find from 'lodash/find'
import axios from 'axios'

import ArticleList from '~/components/ArticleList'
import InfiniteLoading from '~/components/InfiniteLoading'
import Sidebar from '~/components/Sidebar'

export default {
  async asyncData ({ store, params }) {
    if (!store.state.featuredArticles.length) {
      let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=${store.state.featuredID}&_embed`)
      store.commit('setFeaturedArticles', articles.data)
    }

    if (!store.state.topics) {
      let topics = await axios.get(`${store.state.wordpressAPI}/wp/v2/categories?per_page=100`)
      store.commit('setTopics', topics.data)
    }

    if (!find(store.state.topicArticles, {'slug': params.topic})) {
      let topic = find(store.state.topics, {'slug': params.topic})
      let topicArticles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=${topic.id}&_embed`)
      store.commit('setTopicArticles', {slug: params.topic, articles: topicArticles.data, infiniteLoading: true, page: 1})
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  components: {
    ArticleList,
    InfiniteLoading,
    Sidebar
  },

  computed: {
    featuredArticles () {
      return this.$store.state.featuredArticles
    },
    meta () {
      return this.$store.state.meta
    },
    topic () {
      return find(this.$store.state.topics, {
        'slug': this.$route.params.topic
      })
    },
    topicArticles () {
      return find(this.$store.state.topicArticles, {
        'slug': this.$route.params.topic
      })
    },
    topics () {
      return this.$store.state.topic
    }
  },

  head () {
    return {
      title: `${this.topic.name} | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  },

  methods: {
    moreArticles () {
      this.topicArticles.page++

      axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=${this.topic.id}&_embed&page=${this.topicArticles.page}`)
        .then(response => {
          this.topicArticles.articles = this.topicArticles.articles.concat(response.data)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        })
        .catch(() => {
          // this.topicArticles.infiniteLoading = false
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

.topic {
  display: flex;

  .articles {
    background-color: #efefef;
    padding: 0 32px;
    max-width: 900px;
    width: 100%;

    @media (max-width: 1000px) {
      max-width: none;
    }

    @media (max-width: 700px) {
      padding: 0 16px;
    }

    .article-list {
      margin: 32px 0;
    }
  }
}
</style>
