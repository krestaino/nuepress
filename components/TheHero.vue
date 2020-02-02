<template>
  <article>
    <nuxt-link class="group block relative text-gray-100" :to="`/${this.heroArticle.slug}`">
      <div class="lazy" v-if="featuredImage">
        <div :style="paddingTop"></div>
        <img class="absolute top-0 left-0" alt="" v-lazy="featuredImage.source_url" />
        <Spinner1 />
      </div>

      <div class="absolute top-0 left-0 h-full w-full opacity-75 bg-gradient"></div>

      <div class="absolute p-8 top-0 left-0">
        <span v-html="shortTimestamp(heroArticle.date)"></span>
        <span> – </span>
        <span v-for="topic in topics" :key="topic.id" v-html="topic.name"></span>
      </div>

      <div class="absolute p-8 bottom-0 left-0 transition-300ms group-hover:translateX-1">
        <h2 class="text-4xl mb-4" v-html="this.heroArticle.title.rendered"></h2>
        <div v-html="this.heroArticle.excerpt.rendered"></div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
import Spinner1 from '~/components/Spinner1';

export default {
  components: {
    Spinner1
  },
  props: {
    heroArticle: Object
  },
  mixins: {
    shortTimestamp: Function
  },
  computed: {
    paddingTop() {
      return {
        paddingTop: (this.featuredImage.height / this.featuredImage.width) * 100 + '%'
      };
    },
    topics() {
      return this.heroArticle._embedded['wp:term'][0];
    },
    featuredImage() {
      let featuredImage = this.heroArticle._embedded['wp:featuredmedia'];

      if (featuredImage) {
        return (
          featuredImage[0].media_details.sizes.large ||
          featuredImage[0].media_details.sizes.full ||
          false
        );
      }
    }
  }
};
</script>
