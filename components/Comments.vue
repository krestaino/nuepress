<template>
  <div class="comments">
    <div class="disqus" :class="{ ready: disqusReady }">
      <client-only>
        <lazy-component @show="disqusReady = true">
          <vue-disqus shortname="nuepress-kmr-io" :identifier="article.slug" />
        </lazy-component>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: Object
  },
  data() {
    return {
      disqusReady: false
    };
  }
};
</script>

<style lang="scss" scoped>
.comments {
  border-top: 1px dotted #65676a;
  padding-top: 32px;
  margin-top: 32px;

  .disqus {
    min-height: 440px;
    opacity: 0;
    transform: translateY(16px);
    transition: 1s;

    &.ready {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
