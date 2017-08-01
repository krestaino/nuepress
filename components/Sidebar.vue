<template>
  <aside>
    <div class="inner-container">
      <article v-for="article in featuredArticles" :key="article.id">
        <span class="topic fancy" v-for="topic in article._embedded['wp:term'][0]" :key="topic.id" v-html="topic.name" v-if="topic.slug !== 'featured'"></span>
        <h2 v-html="article.title.rendered"></h2>
        <div v-html="article.excerpt.rendered"></div>
      </article>
    </div>
  </aside>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['featuredArticles'],

  computed: {
    topics () {
      return _.pull(this.featuredArticles, {id: 194})
    }
  },

  methods: {
    filterFeaturedText (topics) {

    }
  }
}
</script>

<style scoped lang="scss">
aside {
  min-width: 360px;
  flex: 1;

  .inner-container {
    background-color: #fff;
    padding: 32px;

    > *:first-child {
      margin-top: 0;
    }

    > *:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
