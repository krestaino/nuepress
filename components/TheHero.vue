<template>
  <client-only>
    <article>
      <nuxt-link
        class="group block relative text-gray-100 max-h-1/2-screen overflow-hidden"
        :to="`/${this.heroArticle.slug}`"
      >
        <div class="lazy" v-if="featuredImage">
          <div class="h-half-screen md:h-auto" :style="paddingAspectRatioHack(featuredImage)"></div>
          <img class="absolute top-0 left-0" alt="" v-lazy="featuredImage.source_url" />
          <Spinner1 />
        </div>

        <div class="absolute top-0 left-0 h-full w-full opacity-75 bg-gradient"></div>

        <div
          class="absolute p-5 md:p-8 top-0 left-0 pointer-events-none font-sans uppercase text-sm"
        >
          <span v-html="shortTimestamp(heroArticle.date)"></span>
          <span> – </span>
          <span v-for="topic in topics" :key="topic.id" v-html="topic.name"></span>
        </div>

        <div
          class="absolute p-5 md:p-8 bottom-0 left-0 transition-300ms group-hover:translateX-1 pointer-events-none"
        >
          <h2 class="text-2xl md:text-4xl mb-4" v-html="this.heroArticle.title.rendered"></h2>
          <div v-html="this.heroArticle.excerpt.rendered"></div>
        </div>
      </nuxt-link>
    </article>
  </client-only>
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
    paddingAspectRatioHack: Function,
    shortTimestamp: Function
  },

  computed: {
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
