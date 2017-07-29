<template>
  <main class="outer-container">
    <article class="blog-article">
      <div class="featured" v-if="article._embedded['wp:featuredmedia']">
        <img :src="article._embedded['wp:featuredmedia'][0].source_url">
      </div>
      <div class="inner-container">
        <div class="meta">
          <h1 class="title" v-html="article.title.rendered"></h1>
          <div class="details">
            <span v-html="timestamp(article.date)"></span>
            <span class="separator">|</span>
            <nuxt-link class="author fancy" :to="`/authors/${article._embedded.author[0].slug}`" v-html="article._embedded.author[0].name"></nuxt-link>
          </div>
        </div>
        <div class="content" v-html="article.content.rendered"></div>
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
    article () { return this.$store.state.article }
  },

  async fetch ({ store, params }) {
    let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?slug=${params.slug}&_embed`)
    store.commit('setArticle', articles.data[0])

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
      title: `${this.article.title.rendered} | ${this.meta.name}`,
      meta: [
        { description: this.article.excerpt.rendered.replace(/(<([^>]+)>)/ig, '') } // strips html tags
      ]
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/vars.scss';

.page-enter-active .blog-article .inner-container {
  transition: transform 1s cubic-bezier(.11,.89,.31,.99), opacity 0.75s ease-out;
}

.page-enter .blog-article .inner-container {
  transform: translateY(-16px);
}

article.blog-article {
  background-color: #efefef;
  position: relative;
  height: 100%;

  .inner-container {
    background-color: #efefef;
    margin: 0 auto;
    max-width: 842px;
    padding: 0 96px 96px 96px;

    .content {
      border-top: 1px dotted lighten($primary, 20%);
      padding-top: 32px;
      margin-top: 32px;

      a {
        color: $accent;
        position: relative;

        &:hover {
          color: $accent;
        }

        &::after {
          background: rgba($accent, 0.5);
          content: '';
          height: 1px;
          left: 0;
          opacity: 0;
          position: absolute;
          top: 100%;
          transform: translateY(-4px);
          transition: height 0.1s, opacity 0.1s, transform 0.1s;
          width: 100%;
        }

        &:hover,
        &:focus {
          &::after {
            height: 4px;
            opacity: 1;
            transform: translateY(0px);
          }
        }
      }

      > *:first-child {
        margin-top: 0;
      }
    }

    .wp-caption {
      margin-top: 16px;
      max-width: 100%;
    }
  }

  .featured {
    height: 20vh;

    img {
      position: absolute;
      width: 100%;
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
  }
}
</style>
