<template>
  <aside>
    <div class="inner-container">
      <h1>Top Articles</h1>
      <article v-for="article in featuredArticles" :key="article.id">
        <nuxt-link :to="`/${article.slug}`" v-if="article._embedded['wp:featuredmedia']" class="image">
          <div class="featured lazy" v-if="featuredImage(article)">
            <div class="image-height" :style="{ paddingTop: featuredImage(article).height / featuredImage(article).width * 100 + '%' }"></div>
            <img v-lazy="featuredImage(article).source_url">
            <Spinner1/>
          </div>
        </nuxt-link>
        <div class="content">
          <div class="meta">
            <span v-html="shortTimestamp(article.date)"></span>&nbsp;–&nbsp;<nuxt-link class="topic fancy" v-for="topic in article._embedded['wp:term'][0]" :to="`/topics/${topic.slug}`" :key="topic.id" v-html="topic.name" v-if="topic.id !== $store.state.featuredID"></nuxt-link>
          </div>
          <nuxt-link :to="`/${article.slug}`" class="article">
            <h2 v-html="article.title.rendered"></h2>
            <div class="excerpt" v-html="article.excerpt.rendered"></div>
          </nuxt-link>
        </div>
      </article>
    </div>
  </aside>
</template>

<script>
import Spinner1 from '~/components/Spinner1'

export default {
  components: {
    Spinner1
  },
  props: {
    featuredArticles: Array
  },
  mixins: {
    shortTimestamp: Function
  },
  methods: {
    featuredImage (article) {
      let featuredImage = article._embedded['wp:featuredmedia']

      if (featuredImage) {
        return featuredImage[0].media_details.sizes.medium || false
      }
    }
  }
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

      .image {
        position: relative;

        .featured {
          overflow: hidden;

          &::before {
            background-color: rgba(0, 0, 0, 0);
            content: '';
            height: 100%;
            position: absolute;
            top: 0;
            transition: 0.4s;
            width: 100%;
            z-index: 1;
          }

          img {
            transition: 0.4s;
          }
        }

        &:hover {
          .featured {
            &::before {
              background-color: rgba(0, 0, 0, 0.25);
            }

            img {
              transform: scale(1.0125);
            }
          }
        }
      }

      .featured {
        background-position: center;
        margin-bottom: 12px;

        img {
          position: absolute;
          top: 0;
        }
      }

      .content {
        transition: 0.2s;

        .article {
          display: block;
          transition: 0.2s;

          &:hover {
            transform: translateX(4px);

            .excerpt {
              color: #000;
            }
          }
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
