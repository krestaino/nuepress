<template>
  <div
    v-if="featuredImage.source_url"
    class="lazy rounded-lg rounded-t-none overflow-hidden shadow-2xl"
  >
    <div :style="paddingAspectRatioHack(featuredImage)"></div>
    <img
      class="absolute top-0 left-0 "
      :alt="featuredImage.alt_text"
      v-lazy="featuredImage.source_url"
    />
    <Spinner1 />
  </div>
</template>

<script>
import Spinner1 from '~/components/Spinner1';

export default {
  components: {
    Spinner1
  },

  props: {
    expanded: Boolean,
    featuredImage: Object
  },

  mixins: {
    paddingAspectRatioHack: Function
  }
};
</script>

<style lang="scss" scoped>
.featured-image {
  width: 100%;

  .image-height {
    background-color: #525252;
    position: absolute;
    transition: 0.2s;
    width: 100%;

    @media (max-width: 700px) {
      display: block;
    }
  }

  img {
    backface-visibility: hidden;
    display: block;
    height: auto;
    max-width: 100%;
    position: absolute;
    top: 0;
    transition: opacity 0.8s;
    width: 100%;

    &[lazy='loaded'] {
      opacity: 0.6;

      @media (max-width: 900px) {
        opacity: 1 !important;
      }
    }
  }

  &.expanded {
    img[lazy='loaded'] {
      opacity: 1;
    }
  }

  .featured-image-padding {
    transition: padding-top 1s;
  }

  @media (min-width: 901px) {
    &:not(.expanded) {
      .featured-image-padding {
        padding-top: 96px !important;
      }
    }
  }
}
</style>
