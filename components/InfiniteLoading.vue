<template>
  <client-only>
    <InfiniteLoading class="pt-12 w-full overflow-hidden" @infinite="moreArticles">
      <span slot="spinner">
        <Spinner1 />
      </span>
      <span slot="no-results" class="flex flex-col w-full">
        <InfiniteLoadingComplete />
      </span>
      <span slot="no-more" class="flex flex-col w-full">
        <InfiniteLoadingComplete />
      </span>
    </InfiniteLoading>
  </client-only>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import InfiniteLoadingComplete from '~/components/InfiniteLoadingComplete.vue';
import Spinner1 from '~/components/Spinner1.vue';

export default {
  components: {
    InfiniteLoading,
    InfiniteLoadingComplete,
    Spinner1
  },

  data() {
    return {
      infiniteLoadingPage: 1,
      totalPages: 0
    };
  },

  methods: {
    moreArticles($state) {
      const nextPage = this.infiniteLoadingPage + 1;

      if (nextPage === parseInt(this.totalPages)) {
        $state.complete();
      }

      this.$axios
        .get(`${process.env.WORDPRESS_API_URL}/wp/v2/posts`, {
          params: {
            orderby: 'date',
            per_page: 10,
            categories_exclude: process.env.FEATURED_ID,
            page: nextPage,
            _embed: true
          }
        })
        .then(response => {
          this.$emit('done', response.data);
          this.totalPages = response.headers['x-wp-totalpages'];
          this.infiniteLoadingPage++;
          $state.loaded();
        })
        .catch(() => $state.complete());
    }
  }
};
</script>

<style>
.infinite-loading-container {
  @apply flex items-center justify-center h-40 font-sans text-sm;
}

.infinite-status-prompt {
  @apply relative;
}

.infinite-status-prompt span {
  @apply block;
}

.infinite-status-prompt svg {
  @apply mx-auto mb-1;
}

.infinite-status-prompt div {
  @apply w-full;
}
</style>
