<template>
  <article class="hero">
    <nuxt-link :to="`/${this.heroArticle.slug}`">
      <div class="date">
        <span v-html="timestamp(this.heroArticle.date)"></span>&nbsp;–&nbsp;<span class="topic fancy" v-for="topic in this.heroArticle._embedded['wp:term'][0]" :key="topic.id" v-html="topic.name"></span>
      </div>
      <div class="meta">
        <h2 v-html="this.heroArticle.title.rendered"></h2>
        <div v-html="this.heroArticle.excerpt.rendered"></div>
      </div>
      <div class="featured-image lazy" v-if="featuredImage">
        <div class="image-height" :style="{ paddingTop: featuredImage.height / featuredImage.width * 100 + '%' }"></div>
        <div class="image" v-lazy:backgroundImage="featuredImage.source_url"></div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
import moment from 'moment'

export default {
  computed: {
    featuredImage () {
      let featuredImage = this.heroArticle._embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes.large || featuredImage[0].media_details.sizes.full || false
      }
    }
  },

  methods: {
    timestamp (date) {
      let article = moment(date)
      let today = moment(new Date())
      console.log(today.diff(article))

      if (today.diff(article) > 5.184e+8) {
        return article.format('MMM D')
      } else {
        return article.fromNow()
      }
    }
  },

  props: ['heroArticle']
}
</script>

<style lang="scss" scoped>
.hero {
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

    span {
      text-transform: capitalize;
    }

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

  .featured-image {
    min-height: 440px;
    width: 100%;

    .image {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      display: block;
      height: 100%;
      max-width: 100%;
      position: absolute;
      top: 0;
      width: 100%;
    }
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
}
</style>
