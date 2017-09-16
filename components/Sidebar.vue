<template>
  <aside>
    <div class="inner-container">
      <h1>Top Articles</h1>
      <article v-for="article in featuredArticles" :key="article.id">
        <nuxt-link :to="`/${article.slug}`" v-if="article._embedded['wp:featuredmedia']">
          <div class="featured lazy" v-if="featuredImage(article)">
            <div class="image-height" :style="{ paddingTop: featuredImage(article).height / featuredImage(article).width * 100 + '%' }"></div>
            <img v-lazy="featuredImage(article).source_url">
          </div>
        </nuxt-link>
        <div class="content">
          <div class="meta">
            <span v-html="timestamp(article.date)"></span>&nbsp;–&nbsp;<nuxt-link class="topic fancy" v-for="topic in article._embedded['wp:term'][0]" :to="`/topics/${topic.slug}`" :key="topic.id" v-html="topic.name" v-if="topic.id !== $store.state.featuredID"></nuxt-link>
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
  methods: {
    featuredImage (article) {
      let featuredImage = article._embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes.medium || false
      }
    },

    timestamp (date) {
      let article = moment(date)
      let today = moment(new Date())

      if (today.diff(article) > 5.184e+8) {
        return article.format('MMM D')
      } else {
        return article.fromNow()
      }
    }
  },

  props: ['featuredArticles']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

aside {
  min-width: 360px;
  flex: 1;

  @media (max-width: 1000px) {
    display: none;
  }

  .inner-container {
    background-color: #fff;
    padding: 32px;

    h1 {
      margin-top: 0;
    }

    article {
      div {
        font-weight: 300;
      }

      & + article {
        border-top: 1px dotted lighten($primary, 20%);
        margin-top: 32px;
        padding-top: 32px;
      }

      .featured {
        background-position: center;
        margin-bottom: 12px;

        img {
          position: absolute;
          top: 0;
        }
      }

      .meta {
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
        margin: 12px 0;
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
