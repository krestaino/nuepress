<template>
  <article class="flex flex-col flex-grow">
    <FeaturedImage
      v-if="getFeaturedImage(data, 'large')"
      :featured-image="getFeaturedImage(data, 'large')"
    />
    <transition name="slide-fade">
      <div
        :class="{
          'md:-mt-20 rounded-lg rounded-b-none': getFeaturedImage(data, 'large'),
          'border-t-0': !getFeaturedImage(data, 'large')
        }"
        class="relative bg-white dark:bg-gray-800 max-w-4xl mx-auto p-5 md:p-20 shadow-2xl border border-b-0 border-gray-400 dark:border-gray-700 flex flex-col flex-grow w-full"
      >
        <div class="border-b border-gray-400 dark:border-gray-700 mb-8 pb-8">
          <h1 class="text-4xl" v-html="data.title.rendered"></h1>
          <div class="flex mt-2">
            <span>{{ longTimestamp(data.date) }}</span>
            <span class="mx-2">|</span>
            <nuxt-link class="blue-link" :to="`/authors/${getAuthor(data).slug}`">{{
              getAuthor(data).name
            }}</nuxt-link>
          </div>
        </div>
        <div id="content" v-html="data.content.rendered"></div>
        <Comments :article="data" v-if="$store.state.enableComments && type === 'article'" />
      </div>
    </transition>
  </article>
</template>

<script>
import FeaturedImage from '~/components/FeaturedImage.vue';
import Comments from '~/components/Comments';

export default {
  props: {
    data: Object,
    type: String
  },

  mixins: {
    getAuthor: Function,
    getFeaturedImage: Function,
    longTimestamp: Function
  },

  components: {
    FeaturedImage,
    Comments
  },

  methods: {
    initGallery() {
      let galleries = document.querySelectorAll('#content > .gallery');

      if (galleries.length) {
        if (process.browser) {
          require('lightgallery.js');
          require('lg-zoom.js');
          require('lg-thumbnail.js');
        }

        for (let i = 0; i < galleries.length; i++) {
          lightGallery(galleries[i], {
            download: false,
            selector: 'a'
          });
        }
      }
    }
  },

  mounted() {
    this.initGallery();
  }
};
</script>

<style lang="scss">
@import '~/assets/css/vars.scss';
@import '../node_modules/lightgallery.js/dist/css/lightgallery.css';

// Gallery styles
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
  content: '\E311';
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

// WordPress markup styles
#content {
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

  pre {
    white-space: pre-wrap;
  }

  a {
    @apply border-b-2 border-transparent text-blue-500 no-underline cursor-pointer;
  }

  a:hover {
    @apply border-b-2 border-blue-400 text-blue-400;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  > *:first-child {
    margin-top: 0;
  }
}
</style>
