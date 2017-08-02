<template>
  <article class="featured">
    <nuxt-link :to="`/${this.hero.slug}`">
      <div class="date">
        <span v-html="timestamp(this.hero.date)"></span>&nbsp;–&nbsp;<span class="topic fancy" v-for="topic in this.hero._embedded['wp:term'][0]" :key="topic.id" v-html="topic.name" v-if="topic.id !== 195"></span>
      </div>
      <div class="meta">
        <h2 v-html="this.hero.title.rendered"></h2>
        <div v-html="this.hero.excerpt.rendered"></div>
      </div>
      <div class="lazy">
        <div v-lazy:background-image="featuredImage"></div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
import moment from 'moment'

export default {
  props: ['heroArticle'],

  computed: {
    hero () {
      return this.$store.state.heroArticle[0]
    },

    featuredImage () {
      let featuredImage = this.hero._embedded['wp:featuredmedia']

      if (featuredImage) {
        let sizes = featuredImage[0].media_details.sizes

        if (sizes.large) {
          return sizes.large.source_url
        } else if (sizes.full) {
          return sizes.full.source_url
        } else {
          return false
        }
      }
    }
  },

  methods: {
    timestamp (date) { return moment(date).format('MMM d') }
  }
}
</script>

<style scoped lang="scss">
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
    width: 100%;

    div {
      background-position: center;
      background-size: cover;
      min-height: 500px;
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

  img {
    display: block;
    max-width: 100%;
    z-index: 1;
  }
}
</style>
