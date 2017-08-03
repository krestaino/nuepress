<template>
  <div class="article-list">
    <article v-for="article in articles" :key="article.id">
      <div class="date">
        <span v-html="timestamp(article.date)"></span>
        &nbsp;–&nbsp;
        <span class="topics">
          <nuxt-link class="topic fancy" v-for="topic in article._embedded['wp:term'][0]" :to="`/topics/${topic.slug}`" :key="topic.id" v-html="topic.name"></nuxt-link>
        </span>
      </div>
      <nuxt-link :to="`/${article.slug}`" class="row">
        <div class="col">
          <div class="lazy" v-if="article._embedded['wp:featuredmedia']">
            <img v-lazy="article._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url">
          </div>
        </div>
        <div class="col">
          <h2 v-html="article.title.rendered"></h2>
          <div class="excerpt" v-html="article.excerpt.rendered"></div>
        </div>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  methods: {
    timestamp (date) { return moment(date).format('MMM d') }
  },

  props: ['articles']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

.article-list {
  article + article {
    border-top: 1px dotted lighten($primary, 20%);
    margin-top: 32px;
    padding-top: 32px;
  }

  .row {
    display: flex;

    & + .row {
      margin-top: 16px;
    }

    .col {
      display: flex;
      flex-direction: column;
    }
  }

  .date {
    font-family: 'Roboto', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    margin-bottom: 12px;
    text-transform: uppercase;

    .topic {
      & + .topic {
        margin-left: 8px;

        &::before {
          content: ', ';
          color: $primary;
          left: -7px;
          position: absolute;
        }
      }
    }

    a:hover {
      color: $accent;
    }
  }

  h2 {
    color: #111;
    font-size: 1.2rem;
    margin-bottom: 8px;
    margin-top: -6px;
  }

  .excerpt {
    @media (max-width: 500px) {
      display: none;
    }
  }

  .lazy {
    margin: 0 22px 0 0;

    img {
      display: block;
      height: 144px;
      width: 144px;

      @media (max-width: 1200px) {
        height: 96px;
        width: 96px;
      }

      @media (max-width: 500px) {
        height: 64px;
        width: 64px;
      }
    }
  }

  a {
    color: $primary;
    transition: 0.1s;
    text-decoration: none;

    &:hover {
      color: #111;
    }
  }

  p {
    margin: 0;
  }
}
</style>
