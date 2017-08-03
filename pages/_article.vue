<template>
  <article class="single-article">
    <div class="featured lazy" v-if="featuredImage">
      <div class="image-height" :style="{ paddingTop: featuredImage.height / featuredImage.width * 100 + '%' }"></div>
      <img v-lazy="featuredImage.source_url">
    </div>
    <transition name="slide-fade">
      <div class="narrow">
        <div class="meta">
          <h1 class="title" v-html="article.title.rendered"></h1>
          <div class="details">
            <span v-html="timestamp(article.date)"></span>
            <span class="separator">|</span>
            <nuxt-link class="author fancy" :to="`/authors/${author.slug}`" v-html="author.name"></nuxt-link>
          </div>
        </div>
        <div class="content" v-html="article.content.rendered"></div>
      </div>
    </transition>
  </article>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  async asyncData ({ store, params }) {
    let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?slug=${params.article}&_embed`)
    store.commit('setArticle', articles.data[0])

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  computed: {
    article () { return this.$store.state.article },
    author () { return this.$store.state.article._embedded.author[0] },
    featuredImage () {
      let featuredImage = this.$store.state.article._embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes.large || featuredImage[0].media_details.sizes.full || false
      }
    },
    meta () { return this.$store.state.meta || {} }
  },

  head () {
    return {
      title: `${this.article.title.rendered} | ${this.meta.name}`,
      meta: [
        { description: this.article.excerpt.rendered.replace(/(<([^>]+)>)/ig, '') } // strips html tags
      ]
    }
  },

  methods: {
    timestamp (date) { return moment(date).format('MMM d, YYYY') }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

article {
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  &.page-enter-active .narrow {
    transition: transform 1s cubic-bezier(.11,.89,.31,.99), opacity 0.75s ease-out;
  }

  &.page-enter .narrow, .page-leave-to .narrow {
    transform: translateY(-16px);
  }

  .narrow {
    background-color: #efefef;
    margin: 20vh auto 0 auto;
    max-width: 842px;
    min-height: calc(100vh - 80px - 200px);
    padding: 0 96px 96px 96px;

    @media (max-width: 700px) {
      margin: 0 auto;
      max-width: none;
      min-height: calc(100vh - 60px - 200px);
      padding: 0 16px 16px 16px;
    }
  }

  .featured {
    img {
      display: block;
      position: absolute;
      width: 100%;

      @media (max-width: 700px) {
        position: relative;
      }
    }
  }

  .meta {
    .title {
      font-size: 40px;
      line-height: 1;
      margin-bottom: 16px;
      margin-top: 0;
      padding-top: 64px;

      @media (max-width: 700px) {
        padding-top: 48px;
      }

      @media (max-width: 500px) {
        padding-top: 32px;
      }
    }

    .details {
      font-size: 0.8rem;

      .separator {
        padding: 0 0.5rem;
      }
    }
  }

  .lazy {
    .image-height {
      display: none;

      @media (max-width: 700px) {
        display: block;
      }
    }

    img {
      position: absolute;
      top: 0;
    }
  }

  img {
    height: auto;
    max-width: 100%;
  }
}
</style>

<style lang="scss">
@import '~assets/css/vars.scss';

.single-article {
  .content {
    border-top: 1px dotted lighten($primary, 20%);
    padding-top: 32px;
    margin-top: 32px;

    .wp-caption {
      margin-top: 16px;
      max-width: 100%;
    }

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

    img {
      height: auto;
      max-width: 100%;
    }

    > *:first-child {
      margin-top: 0;
    }
  }
}
</style>
