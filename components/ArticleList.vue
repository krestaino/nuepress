<template>
  <div class="pt-5 md:pt-8">
    <article
      class="mt-5 px-5 md:mt-8 md:px-8 border-t border-gray-400 dark:border-gray-700 pt-4 first:border-t-0 first:mt-0 first:pt-0"
      v-for="article in articles"
      :key="article.id"
    >
      <span class="font-sans uppercase text-sm">
        <span v-html="shortTimestamp(article.date)"></span>
        <span> – </span>
        <span
          v-for="(topic, index) in article._embedded['wp:term'][0]"
          :key="topic.id"
          class="mr-1 inline-flex"
        >
          <nuxt-link
            class="hover:underline"
            :to="`/topics/${topic.slug}`"
            v-text="topic.name"
          ></nuxt-link>
          <span>{{ index !== article._embedded['wp:term'][0].length - 1 ? ', ' : '' }}</span>
        </span>
      </span>
      <nuxt-link
        :to="`/${article.slug}`"
        class="flex flex-col md:flex-row mt-4 transition-300ms hover:translateX-1"
      >
        <div class="md:w-2/12" v-if="featureImage(article)">
          <div class="lazy thumbnail hidden md:block mr-4 rounded overflow-hidden">
            <img
              :alt="featureImage(article).alt_text"
              v-lazy="featureImage(article).media_details.sizes.thumbnail.source_url"
            />
            <Spinner1 class="spinner" />
          </div>
          <div class="lazy md:hidden" v-if="featureImage(article)">
            <img
              :alt="featureImage(article).alt_text"
              v-lazy="featureImage(article).media_details.sizes.medium.source_url"
            />
            <Spinner1 class="spinner" />
          </div>
        </div>
        <div class="md:w-10/12 mt-4 md:mt-0">
          <h2 class="font-medium text-2xl mb-2 -mt-1" v-html="article.title.rendered"></h2>
          <div v-html="article.excerpt.rendered"></div>
        </div>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
import Spinner1 from '~/components/Spinner1';

export default {
  components: {
    Spinner1
  },
  methods: {
    featureImage(article) {
      return article._embedded['wp:featuredmedia']
        ? article._embedded['wp:featuredmedia'][0]
        : false;
    }
  },
  props: {
    articles: Array
  },
  mixins: {
    shortTimestamp: Function
  }
};
</script>
