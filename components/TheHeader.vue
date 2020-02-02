<template>
  <header class="fixed top-0 left-0 w-full h-12 md:h-20 z-10 font-sans ">
    <section
      class="container dark:border-gray-700 bg-blur bg-white-translucent dark:bg-dark-translucent h-full overflow-hidden"
      :class="{
        'h-screen': expandHeader,
        'items-start': expandHeader,
        'overflow-visible': expandHeader
      }"
    >
      <h1
        class="text-xl md:text-2xl cursor-pointer"
        v-html="meta.name"
        @click.prevent="homeScrollTop"
      ></h1>

      <div
        :class="{
          hidden: $store.state.header.searchOpen
        }"
      >
        <nav
          :key="$store.state.header.menuOpen"
          :class="{
            animate: true,
            'animate-none': !$store.state.header.menuOpen
          }"
        >
          <nuxt-link class="mx-5 md:mr-0 my-2 py-2" to="/" exact>Latest Articles</nuxt-link>
          <nuxt-link class="mx-5 md:mr-0 my-2 py-2" to="/topics">Topics</nuxt-link>
          <nuxt-link class="mx-5 md:mr-0 my-2 py-2" to="/authors">Authors</nuxt-link>
          <nuxt-link class="mx-5 md:mr-0 my-2 py-2" to="/pages/about">About</nuxt-link>
        </nav>
      </div>

      <div class="ml-auto">
        <button
          @click="
            $store.commit('setHeader', {
              menuOpen: false,
              searchOpen: !$store.state.header.searchOpen
            })
          "
        >
          <SearchIcon v-if="!$store.state.header.searchOpen" />
          <CloseIcon v-else />
        </button>
        <button
          @click="
            $store.commit('setHeader', {
              menuOpen: !$store.state.header.menuOpen,
              searchOpen: false
            })
          "
          class="md:hidden"
        >
          <MenuIcon v-if="!$store.state.header.menuOpen" />
          <CloseIcon v-else />
        </button>
      </div>
      <TheHeaderSearch v-if="$store.state.header.searchOpen" />
    </section>
  </header>
</template>

<script>
import TheHeaderSearch from '~/components/TheHeaderSearch';
import MenuIcon from '~/assets/svg/Menu.vue';
import CloseIcon from '~/assets/svg/Clear.vue';
import SearchIcon from '~/assets/svg/Search.vue';

export default {
  components: {
    MenuIcon,
    CloseIcon,
    SearchIcon,
    TheHeaderSearch
  },

  computed: {
    expandHeader() {
      return this.$store.state.header.menuOpen || this.$store.state.header.searchOpen;
    },
    meta() {
      return this.$store.state.meta;
    }
  },

  watch: {
    $route() {
      if (this.$store.state.header.menuOpen || this.$store.state.header.searchOpen) {
        this.$store.commit('setHeader', {
          menuOpen: false,
          searchOpen: false
        });
      }
    }
  },

  mixins: {
    homeScrollTop: Function
  }
};
</script>

<style lang="scss" scoped>
section {
  @apply mx-auto flex px-5 border-t-0 border-gray-300 pt-3;
}

@screen md {
  section {
    @apply px-8 border items-center pt-0;
  }
}

nav {
  @apply flex flex-col text-lg font-light fixed top-12 left-0 w-full z-10 h-screen;
}

@screen md {
  nav {
    @apply flex-row ml-8 static bg-transparent text-left h-auto;
  }
}

.animate {
  animation: slide-down 300ms;
  animation-fill-mode: forwards;
}

.animate-none {
  animation-duration: 0s;
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
