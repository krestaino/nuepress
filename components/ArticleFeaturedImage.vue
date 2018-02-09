<template>
  <div>
    <div
      v-if="featuredImage.source_url"
      class="featured-image lazy"
      :class="{ 'expanded': expanded }"
    >
      <div
        class="image-height"
        :style="{ paddingTop: featuredImageAspectRatio}"
      ></div>
      <img v-lazy="featuredImage.source_url">
      <div
        class="featured-image-padding"
        :style="{ paddingTop: featuredImageAspectRatio}"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    expanded: Boolean,
    featuredImage: Object
  },

  computed: {
    featuredImageAspectRatio () {
      return this.featuredImage.height / this.featuredImage.width * 100 + '%'
    }
  }
}
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

    &[lazy="loaded"] {
      opacity: 0.6;

      @media (max-width: 900px) {
        opacity: 1 !important;
      }
    }
  }

  &.expanded {
    img[lazy="loaded"] {
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
