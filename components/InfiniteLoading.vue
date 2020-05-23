<template>
  <client-only>
    <InfiniteLoading class="pt-12 w-full overflow-hidden relative" @infinite="moreArticles">
      <span slot="spinner">
        <Spinner1 />
      </span>
      <span slot="no-results" class="flex flex-col w-full bg-green-600">
        <InfiniteLoadingComplete />
      </span>
      <span slot="no-more" class="flex flex-col w-full bg-green-600">
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

  props: {
    params: Object
  },

  methods: {
    moreArticles($state) {
      const nextPage = this.infiniteLoadingPage + 1;

      if (nextPage === parseInt(this.totalPages)) {
        $state.complete();
      }

      this.$axios
        .get(`${process.env.WORDPRESS_API_URL}/wp/v2/posts`, {
          params: { ...this.$store.state.params, ...this.params, page: nextPage }
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
  @apply flex items-center justify-center font-sans text-sm;
}

.infinite-status-prompt {
  @apply relative flex-1 text-white mt-auto;
}

.infinite-status-prompt span {
  @apply block p-5;
}

.infinite-status-prompt div {
  @apply w-full relative mx-auto;
}
</style>
