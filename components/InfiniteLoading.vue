<template>
  <div class="infinite-loading-container">
    <div v-show="isLoading">
      <slot name="spinner">
        <Spinner1 class="spinner-1"/>
      </slot>
    </div>
    <div class="infinite-status-prompt" v-show="!isLoading && isComplete && isFirstLoad">
      <slot name="no-results"></slot>
    </div>
    <div class="infinite-status-prompt" v-show="!isLoading && isComplete && !isFirstLoad">
      <slot name="no-more">You've reached the end.</slot>
    </div>
  </div>
</template>
<script>

  /* eslint-disable */

  /**
   * get the first scroll parent of an element
   * @param  {DOM} elm    the element which find scorll parent
   * @return {DOM}        the first scroll parent
   */
  function getScrollParent(elm) {
    if (elm.tagName === 'BODY') {
      return window;
    } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
      return elm;
    } else if (elm.hasAttribute('infinite-wrapper') || elm.hasAttribute('data-infinite-wrapper')) {
      return elm;
    }
    return getScrollParent(elm.parentNode);
  }

  /**
   * get current distance from bottom
   * @param  {DOM}    scrollElm     scroll element
   * @param  {DOM}    infiniteElm   infinite element
   * @param  {String} dir           calculate direction
   * @return {Number}     distance
   */
  function getCurrentDistance(scrollElm, infiniteElm, dir) {
    let distance;

    if (dir === 'top') {
      distance = isNaN(scrollElm.scrollTop) ? scrollElm.pageYOffset : scrollElm.scrollTop;
    } else {
      const infiniteElmOffsetTopFromBottom = infiniteElm.getBoundingClientRect().top;
      const scrollElmOffsetTopFromBottom = scrollElm === window ?
                                           window.innerHeight :
                                           scrollElm.getBoundingClientRect().bottom;

      distance = infiniteElmOffsetTopFromBottom - scrollElmOffsetTopFromBottom;
    }

    return distance;
  }

  import Spinner1 from '~/components/Spinner1'

  export default {
    components: {
      Spinner1
    },
    data() {
      return {
        scrollParent: null,
        scrollHandler: null,
        isLoading: false,
        isComplete: false,
        isFirstLoad: true, // save the current loading whether it is the first loading
      };
    },
    props: {
      distance: {
        type: Number,
        default: 100,
      },
      onInfinite: Function,
      spinner: String,
      direction: {
        type: String,
        default: 'bottom',
      },
    },
    mounted() {
      this.scrollParent = getScrollParent(this.$el);

      this.scrollHandler = function scrollHandlerOriginal() {
        if (!this.isLoading) {
          this.attemptLoad();
        }
      }.bind(this);

      setTimeout(this.scrollHandler, 1);
      this.scrollParent.addEventListener('scroll', this.scrollHandler);

      this.$on('$InfiniteLoading:loaded', () => {
        this.isFirstLoad = false;
        if (this.isLoading) {
          this.$nextTick(this.attemptLoad);
        }
      });
      this.$on('$InfiniteLoading:complete', () => {
        this.isLoading = false;
        this.isComplete = true;
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      });
      this.$on('$InfiniteLoading:reset', () => {
        this.isLoading = false;
        this.isComplete = false;
        this.isFirstLoad = true;
        this.scrollParent.addEventListener('scroll', this.scrollHandler);
        setTimeout(this.scrollHandler, 1);
      });
    },
    /**
     * To adapt to keep-alive feature, but only work on Vue 2.2.0 and above, see: https://vuejs.org/v2/api/#keep-alive
     */
    deactivated() {
      this.isLoading = false;
      this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    },
    activated() {
      this.scrollParent.addEventListener('scroll', this.scrollHandler);
    },
    methods: {
      attemptLoad() {
        const currentDistance = getCurrentDistance(this.scrollParent, this.$el, this.direction);
        if (!this.isComplete && currentDistance <= this.distance) {
          this.isLoading = true;
          this.onInfinite.call();
        } else {
          this.isLoading = false;
        }
      },
    },
    destroyed() {
      if (!this.isComplete) {
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      }
    },
  };
</script>
