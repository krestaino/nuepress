<template>
  <main class="outer-container">
    <article class="blog-article">
      <img class="featured" v-if="post._embedded['wp:featuredmedia']" :src="post._embedded['wp:featuredmedia'][0].source_url">
      <div class="inner-container">
        <div class="meta">
          <h1 class="title" v-html="post.title.rendered"></h1>
          <div class="details">
            <span v-html="timestamp(post.date)"></span>
            <span class="separator">|</span>
            <nuxt-link class="author" :to="`/authors/${post._embedded.author[0].slug}`" v-html="post._embedded.author[0].name"></nuxt-link>
          </div>
        </div>
        <div class="content" v-html="post.content.rendered"></div>
      </div>
    </article>
  </main>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  computed: {
    meta () { return this.$store.state.meta },
    post () { return this.$store.state.article }
  },

  async fetch ({ store, params }) {
    let posts = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?slug=${params.slug}&_embed`)
    store.commit('setArticle', posts.data[0])

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  methods: {
    timestamp (date) { return moment(date).format('MMM d, YYYY') }
  },

  head () {
    return {
      title: `${this.post.title.rendered} | ${this.meta.name}`,
      meta: [
        { description: this.post.excerpt.rendered.replace(/(<([^>]+)>)/ig, '') } // strips html tags
      ]
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/vars.scss';

article.blog-article {
  background-color: #efefef;
  padding: 0 0 96px 0;
  position: relative;
  height: 100%;

  .inner-container {
    margin: 0 auto;
    max-width: 650px;

    .content {
      border-top: 1px dotted lighten($primary, 20%);
      padding-top: 32px;
      margin-top: 32px;

      > *:first-child {
        margin-top: 0;
      }
    }

    .wp-caption {
      margin-top: 16px;
      max-width: 100%;
    }
  }

  .meta {
    .title {
      font-size: 40px;
      line-height: 1;
      margin-bottom: 16px;
      margin-top: 0;
      padding-top: 64px;
    }

    .details {
      font-size: 0.8rem;

      .separator {
        padding: 0 0.5rem;
      }
    }
  }

  img {
    height: auto;
    max-width: 100%;

    &.featured {
      width: 100%;
    }
  }
}
</style>
