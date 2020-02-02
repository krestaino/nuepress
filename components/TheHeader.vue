<template>
  <header class="fixed top-0 left-0 w-full h-20 z-10 font-sans">
    <div
      class="container mx-auto flex items-center h-full px-5 md:px-8 border border-t-0 border-gray-300 dark:border-gray-700 bg-blur bg-white-translucent dark:bg-dark-translucent"
    >
      <h1 class="text-2xl cursor-pointer" v-html="meta.name" @click.prevent="homeScrollTop"></h1>
      <nav class="text-lg ml-8 font-light">
        <nuxt-link class="ml-4" to="/" exact>Latest Articles</nuxt-link>
        <nuxt-link class="ml-4" to="/topics">Topics</nuxt-link>
        <nuxt-link class="ml-4" to="/authors">Authors</nuxt-link>
        <nuxt-link class="ml-4" to="/pages/sample-page">Sample Page</nuxt-link>
      </nav>
      <!-- <TheHeaderSearch /> -->
    </div>
  </header>
</template>

<script>
import TheHeaderSearch from '~/components/TheHeaderSearch';

export default {
  components: {
    TheHeaderSearch
  },

  computed: {
    meta() {
      return this.$store.state.meta;
    }
  },

  mixins: {
    homeScrollTop: Function
  }
};
</script>

<style lang="scss" scoped>
// @import '~/assets/css/vars.scss';

// header {
//   font-family: 'Roboto', sans-serif;
//   left: 0;
//   position: fixed;
//   top: 0;
//   width: 100%;
//   z-index: 10;

//   > div {
//     align-items: center;
//     border-bottom: 1px solid #d8d8d8;
//     background-color: #fff;
//     display: flex;
//     height: 80px;
//     margin: 0 auto;
//     padding: 0 32px;
//     transition: padding-top 0.5s, padding-bottom 0.5s;

//     @media (max-width: 700px) {
//       height: 60px;
//       padding: 16px;
//     }
//   }

//   .blog-title {
//     margin-right: 32px;

//     @media (max-width: 700px) {
//       margin-right: 16px;
//     }

//     h1 {
//       color: #666;
//       cursor: pointer;
//       font-size: 1.1rem;
//       font-weight: 400;
//     }
//   }

//   nav {
//     flex-shrink: 0;

//     @media (max-width: 500px) {
//       display: none;
//     }
//   }

//   a {
//     border-color: lighten($primary, 40%);
//     color: #757575;
//     font-size: 0.9rem;
//     font-weight: 300;
//     text-decoration: none;
//     transition: color 0.1s, border-color 0.1s;

//     &:hover {
//       color: #555;
//       border-color: #555;
//     }

//     &.nuxt-link-active {
//       padding-bottom: 4px;
//       border-bottom: 2px solid;
//     }

//     & + a {
//       margin-left: 32px;

//       @media (max-width: 700px) {
//         margin-left: 16px;
//       }
//     }
//   }
// }
</style>
