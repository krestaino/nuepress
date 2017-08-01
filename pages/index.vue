<template>
  <main class="outer-container">
    <div class="inner-container">
      <article class="featured">
        <nuxt-link :to="`/${featuredArticles[0][0].slug}`">
          <div class="date">
            <span v-html="timestamp(featuredArticles[0][0].date)"></span>&nbsp;–&nbsp;<span class="topic fancy" v-for="topic in featuredArticles[0][0]._embedded['wp:term'][0]" :key="topic.id" v-html="topic.name"></span>
          </div>
          <div class="meta">
            <h2 v-html="featuredArticles[0][0].title.rendered"></h2>
            <div v-html="featuredArticles[0][0].excerpt.rendered"></div>
          </div>
          <div class="lazy" v-lazy:background-image="hero.image.url" :style="{ minHeight: hero.image.height + 'px' }"></div>
        </nuxt-link>
      </article>
      <article-list :articles="articles"></article-list>
      <infinite-loading :on-infinite="moreArticles" ref="infiniteLoading">
        <spinner-1 class="spinner-1" slot="spinner"></spinner-1>
      </infinite-loading>
    </div>
    <sidebar></sidebar>
  </main>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import ArticleList from '~/components/ArticleList'
import InfiniteLoading from '~/components/InfiniteLoading'
import Sidebar from '~/components/Sidebar'
import Spinner1 from '~/components/Spinner1'

export default {
  components: {
    ArticleList,
    InfiniteLoading,
    Sidebar,
    Spinner1
  },

  data () {
    return {
      page: 1
    }
  },

  computed: {
    meta () { return this.$store.state.meta },
    articles () { return this.$store.state.articles },
    featuredArticles () { return this.$store.state.featuredArticles },
    hero () {
      let featured = this.$store.state.featuredArticles[0][0]
      return {
        image: {
          height: featured._embedded['wp:featuredmedia'][0].media_details.sizes.medium.height,
          url: featured._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
        }
      }
    }
  },

  async asyncData ({ store, params }) {
    if (store.state.articles.length === 0) {
      let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories_exclude=194&_embed`)
      store.commit('setArticles', articles.data)
    }

    if (store.state.featuredArticles.length === 0) {
      let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=194&_embed`)
      store.commit('setFeaturedArticles', articles.data)
    }

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  methods: {
    moreArticles () {
      axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&_embed&page=${this.page++}`)
        .then(response => {
          this.$store.commit('setArticles', response.data)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        })
        .catch(error => {
          console.log(error)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        })
    },

    timestamp (date) { return moment(date).format('MMM d') }
  },

  head () {
    return {
      title: `Home | ${this.meta.name}`,
      meta: [
        { description: this.meta.description }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.outer-container {
  display: flex;

  .inner-container {
    background-color: #efefef;
    padding-right: 32px;
    max-width: 900px;
    width: 100%;
  }

  .featured {
    margin-bottom: 32px;
    margin-top: 32px;
    margin-top: 0;
    margin-right: -32px;

    &:before {
      content: '';
      display: block;
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image:
        linear-gradient(
          to top, 
          rgba(0,0,0,.85), rgba(0,0,0,0) 60%
        );
      z-index: 2;
    }

    a {
      align-items: flex-end;
      display: flex;
    }

    .date {
      top: 0;
      color: #eee;
      display: flex;
      margin: 0 auto 0 0;
      padding: 32px;
      position: absolute;
      text-shadow: 1px 1px 0px rgba(0, 0, 0, 1);
      z-index: 2;

      a {
        color: #eee;

        &::after {
          background: #eee;
        }
      }

      .topic + .topic {
        margin-left: 8px;

        &::before {
          content: ', ';
          color: #eee;
          left: -7px;
          position: absolute;
        }
      }
    }

    .lazy {
      background-position: center;
      background-size: cover;
      min-height: 500px;
      width: 100%;
    }

    .meta {
      bottom: 0;
      color: #eee;
      margin: 0 auto 0 0;
      padding: 32px;
      position: absolute;
      text-shadow: 1px 1px 0px rgba(0, 0, 0, 1);
      z-index: 2;

      h2 {
        color: #eee;
        font-size: 1.75rem;
        line-height: 1.2;
        margin: 0;
      }

      p {
        margin: 0;
      }
    }

    img {
      display: block;
      max-width: 100%;
      z-index: 1;
    }
  }
}
</style>
