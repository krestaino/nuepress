<template>
  <aside>
    <div class="inner-container">
      <h1>Top Articles</h1>
      <article v-for="article in featuredArticles" :key="article.id">
        <nuxt-link :to="`/${article.slug}`" v-if="article._embedded['wp:featuredmedia']">
          <div class="lazy">
            <div v-lazy:background-image="article._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url" :style="{ minHeight: article._embedded['wp:featuredmedia'][0].media_details.sizes.medium.height + 'px' }"></div>
          </div>
        </nuxt-link>
        <div class="content">
          <div class="meta">
            <span v-html="timestamp(article.date)"></span>&nbsp;–&nbsp;<nuxt-link class="topic fancy" v-for="topic in article._embedded['wp:term'][0]" :to="`/topics/${topic.slug}`" :key="topic.id" v-html="topic.name" v-if="topic.slug !== 'featured'"></nuxt-link>
          </div>
          <nuxt-link :to="`/${article.slug}`">
            <h2 v-html="article.title.rendered"></h2>
            <div v-html="article.excerpt.rendered"></div>
          </nuxt-link>
        </div>
      </article>
    </div>
  </aside>
</template>

<script>
import moment from 'moment'

export default {
  props: ['featuredArticles'],

  methods: {
    timestamp (date) { return moment(date).format('MMM d') }
  }
}
</script>

<style lang="scss">
@import './assets/css/vars.scss';

aside {
  min-width: 360px;
  flex: 1;

  .inner-container {
    background-color: #fff;
    padding: 32px;

    h1 {
      margin-top: 0;
    }

    article {
      & + article {
        margin-top: 32px;
      }

      .meta {
        margin-top: 12px;

        .topic {
          position: relative;

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
      }

      h2 {
        margin: 12px 0;
      }

      img {
        display: block;
        max-width: 100%;
      }

      .content {
        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
