<template>
  <section class="outer-container">
    <div class="inner-container">
      <div class="page-title">
        <h1 v-html="topic.name"></h1>
        <p v-html="topic.description"></p>
      </div>
      <p v-html="topic.description"></p>
      <article-list :articles="topicArticles.articles"></article-list>
    </div>
    <sidebar></sidebar>
  </section>
</template>

<script>
import _ from 'lodash'
import ArticleList from '~/components/ArticleList'
import axios from 'axios'
import Sidebar from '~/components/Sidebar'

export default {
  components: {
    ArticleList,
    Sidebar
  },

  computed: {
    meta () { return this.$store.state.meta },
    topic () { return _.find(this.$store.state.topics, {'slug': this.$route.params.slug}) },
    topicArticles () { return _.find(this.$store.state.topicArticles, {'slug': this.$route.params.slug}) },
    topics () { return this.$store.state.topics }
  },

  async asyncData ({ store, params }) {
    if (!store.state.topics) {
      let topics = await axios.get(`${store.state.wordpressAPI}/wp/v2/categories?per_page=100`)
      store.commit('setTopics', topics.data)
    }

    if (!_.find(store.state.topicArticles, {'slug': params.slug})) {
      let topic = _.find(store.state.topics, {'slug': params.slug})
      let topicArticles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=${topic.id}&_embed`)
      store.commit('setTopicArticles', {slug: params.slug, articles: topicArticles.data})
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  head () {
    return {
      title: `${this.topic.name} | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/css/vars.scss';

.outer-container {
  display: flex;
  padding-top: 48px;

  .inner-container {
    margin-right: 48px;
    max-width: 900px;
    width: 100%;
  }

  .page-title {
    margin-bottom: 32px;
    margin-top: 0;
  }
}
</style>
