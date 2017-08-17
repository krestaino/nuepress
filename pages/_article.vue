<template>
  <article class="single-article">
    <div class="featured-image lazy" :class="{ 'expanded': expanded }" v-if="featuredImage.source_url">
      <div class="image-height"
        :style="{ backgroundColor: `rgb(${RGB[0]},${RGB[1]},${RGB[2]})`, paddingTop: featuredImage.height / featuredImage.width * 100 + '%' }"></div>
      <img v-lazy="featuredImage.source_url">
      <div class="featured-image-padding"
        :style="{ paddingTop: featuredImage.height / featuredImage.width * 100 + '%' }">
      </div>
    </div>
    <transition name="slide-fade">
      <div class="narrow" :class="{ 'expanded': expanded, 'no-featured-image': !featuredImage }">
        <button class="expand-featured-image" title="Show full image" @click.prevent="expanded = !expanded" :class="{ 'expanded': expanded }" v-if="featuredImage.source_url">
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
        <div class="meta">
          <h1 class="title">{{ article.title.rendered }}</h1>
          <div class="details">
            <span>{{ timestamp(article.date) }}</span>
            <span class="separator">|</span>
            <nuxt-link class="author fancy" :to="`/authors/${author.slug}`">{{ author.name }}</nuxt-link>
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
import * as Vibrant from 'node-vibrant'

if (process.browser) {
  require('lightgallery.js')
  require('lg-zoom.js')
  require('lg-thumbnail.js')
}

export default {
  async asyncData ({ store, params }) {
    let articles = await axios.get(`${store.state.wordpressAPI}/wp/v2/posts?slug=${params.article}&_embed`)
    store.commit('setArticle', articles.data[0])

    if (!store.state.meta) {
      let meta = await axios.get(store.state.wordpressAPI)
      store.commit('setMeta', meta.data)
    }
  },

  beforeMount () {
    if (this.featuredImage.source_url) {
      let img = this.article._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url

      Vibrant.from(img).getPalette((err, palette) => {
        if (!err) {
          this.$store.commit('setFeaturedColor', palette)
        }
      })
    }
  },

  computed: {
    article () {
      return this.$store.state.article
    },
    author () {
      return this.$store.state.article._embedded.author[0]
    },
    featuredImage () {
      let featuredImage = this.$store.state.article._embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes.large || featuredImage[0].media_details.sizes.full || false
      } else {
        return { height: 0, width: 0 }
      }
    },
    meta () {
      return this.$store.state.meta
    }
  },

  data () {
    return {
      expanded: false,
      RGB: {}
    }
  },

  head () {
    return {
      title: `${this.article.title.rendered} | ${this.meta.name}`,
      meta: [
        { description: this.article.excerpt.rendered }
      ]
    }
  },

  methods: {
    gallery () {
      let galleries = document.querySelectorAll('.content > .gallery')

      for (let i = 0; i < galleries.length; i++) {
        // eslint-disable-next-line
        lightGallery(galleries[i], {
          download: false,
          selector: 'a'
        })
      }
    },
    timestamp (date) {
      return moment(date).format('MMM D, YYYY')
    }
  },

  mounted () {
    this.gallery()
  },

  watch: {
    '$store.state.featuredColor' () {
      this.RGB = this.$store.state.featuredColor.DarkMuted._rgb
    }
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
    margin: 0 auto;
    max-width: 842px;
    min-height: calc(100vh - 80px - 96px - 200px);
    padding: 0 96px 96px 96px;
    position: relative;
    transition: min-height 1s, transform 1s;
    transform: translateY(0);
    width: 100%;

    &.expanded {
      min-height: 0;
    }

    @media (max-width: 900px) {
      margin-top: 0 !important;
      max-width: 100%;
      min-height: initial;
    }

    @media (max-width: 700px) {
      max-width: none;
      padding: 0 16px 16px 16px;
    }

    .expand-featured-image {
      background-color: transparent;
      border: 0;
      cursor: pointer;
      outline: 0;
      position: absolute;
      right: 32px;
      top: 32px;
      transition: 1s;
      z-index: 1;

      @media (max-width: 900px) {
        display: none;
      }

      &:hover {
        svg {
          opacity: 1;
        }
      }

      &.expanded {
        transform: rotate(180deg);
      }

      svg {
        fill: $primary;
        height: 24px;
        opacity: 0.7;
        transition: 0.1s;
        width: 24px;
      }
    }

    &.no-featured-image {
      margin: 0 auto;
    }
  }

  .featured-image {
    width: 100%;

    .image-height {
      background-color: #efefef;
      position: absolute;
      transition: 0.2s;
      width: 100%;

      @media (max-width: 700px) {
        display: block;
      }
    }

    img {
      backface-visibility: hidden;
      display: block;
      height: auto;
      max-width: 100%;
      position: absolute;
      top: 0;
      transition: opacity 0.8s;
      width: 100%;

      &[lazy="loaded"] {
        opacity: 0.6;
      }
    }

    &.expanded {
      img[lazy="loaded"] {
        opacity: 1;
      }
    }

    .featured-image-padding {
      transition: padding-top 1s;
    }

    @media (min-width: 901px) {
      &:not(.expanded) {
        .featured-image-padding {
          padding-top: 96px !important;
        }
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
}
</style>

<style lang="scss">
@import '../node_modules/lightgallery.js/dist/css/lightgallery.css';
@import '~assets/css/vars.scss';

.lg-backdrop {
  background-color: #111;
}

#lg-counter {
  font-family: 'Roboto', sans-serif;
}

.lg-toolbar,
.lg-actions .lg-next,
.lg-actions .lg-prev,
.lg-outer .lg-thumb-outer,
.lg-outer .lg-toggle-thumb {
  background-color: #1a1a1a;
}

#lg-actual-size:after {
  content: "\E311";
}

#lg-zoom-in,
#lg-zoom-out {
  display: none;
}

.lg-outer .lg-thumb-item {
  border-radius: 2px;
}

.lg-outer .lg-thumb-item {
  border-color: #aaa;
}

.lg-outer .lg-thumb-item.active,
.lg-outer .lg-thumb-item:hover {
  border-color: #fff;
}
</style>

<style lang="scss">
@import '~assets/css/vars.scss';

.single-article {
  .content {
    border-top: 1px dotted lighten($primary, 20%);
    padding-top: 32px;
    margin-top: 32px;

    .alignnone,
    .size-full,
    .wp-caption {
      background-color: #fff;
      padding: 16px;
      display: block;
      margin-bottom: 32px;

      img {
        display: block;
        padding: 0;
        margin-bottom: 16px;
      }

      &.alignnone {
        max-width: 100%;
      }

      &.aligncenter {
        margin-left: auto;
        margin-right: auto;
      }

      &.alignleft {
        float: left;
        margin-right: 32px;
        width: initial;
      }

      &.alignright {
        float: right;
        margin-left: 32px;
        width: initial;
      }
    }

    .wp-caption {    
      p {
        margin-bottom: 0;

        & + p {
          margin-top: 16px;
        }
      }
    }

    p {
      margin-bottom: 32px;
      margin-top: 0;
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
