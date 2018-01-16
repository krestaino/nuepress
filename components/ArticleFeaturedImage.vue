<template>
  <div>
    <div
      v-if="featuredImage.source_url"
      class="featured-image lazy"
      :class="{ 'expanded': expanded }"
    >
      <div
        class="image-height"
        :style="[backgroundColor, paddingTop]"
      ></div>
      <img v-lazy="featuredImage.source_url">
      <div
        class="featured-image-padding"
        :style="paddingTop"
      >
      </div>
    </div>
    <div v-html="linkRGB"></div>
  </div>
</template>

<script>
export default {
  props: {
    expanded: Boolean,
    featuredImage: Object
  },
  data () {
    return {
      RGB: {
        DarkMuted: {},
        DarkVibrant: {}
      }
    }
  },
  computed: {
    backgroundColor () {
      return {
        backgroundColor: `rgb(${this.RGB.DarkMuted[0]},${this.RGB.DarkMuted[1]},${this.RGB.DarkMuted[2]})`
      }
    },
    paddingTop () {
      return {
        paddingTop: this.featuredImage.height / this.featuredImage.width * 100 + '%'
      }
    },
    linkRGB () {
      return `
        <style>
          html {
            background: rgb(${this.RGB.DarkMuted[0]},${this.RGB.DarkMuted[1]},${this.RGB.DarkMuted[2]}) !important
          }
          main a {
            color: rgb(${this.RGB.DarkVibrant[0]},${this.RGB.DarkVibrant[1]},${this.RGB.DarkVibrant[2]}) !important
          }
          main a:hover {
            color: rgb(${this.RGB.DarkMuted[0]},${this.RGB.DarkMuted[1]},${this.RGB.DarkMuted[2]}) !important
          }
          main a::after {
            background: rgb(${this.RGB.DarkMuted[0]},${this.RGB.DarkMuted[1]},${this.RGB.DarkMuted[2]}) !important
          }
        </style>
      `
    }
  },
  watch: {
    '$store.state.featuredColor' () {
      this.RGB = {
        DarkMuted: this.$store.state.featuredColor.DarkMuted._rgb,
        DarkVibrant: this.$store.state.featuredColor.DarkVibrant._rgb
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.featured-image {
  width: 100%;

  .image-height {
    background-color: #efefef;
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
