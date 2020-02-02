<template>
  <Header>
    <Logo @click="() => homeScrollTop()" />

    <Menu>
      <Link to="/" name="Latest Articles" />
      <Link to="/topics" name="Topics" />
      <Link to="/authors" name="Authors" />
      <Link to="/pages/about" name="About" />
    </Menu>

    <Controls>
      <SearchButton @click="() => setHeaderState({ menuOpen: false, searchOpen: !searchOpen })" />
      <MenuButton @click="() => setHeaderState({ menuOpen: !menuOpen, searchOpen: false })" />
    </Controls>

    <TheHeaderSearch />
  </Header>
</template>

<script>
import Header from '~/components/TheHeader/Header.vue';
import Menu from '~/components/TheHeader/Menu.vue';
import Link from '~/components/TheHeader/Link.vue';
import Logo from '~/components/TheHeader/Logo.vue';
import Controls from '~/components/TheHeader/Controls.vue';
import MenuButton from '~/components/TheHeader/MenuButton.vue';
import SearchButton from '~/components/TheHeader/SearchButton.vue';
import TheHeaderSearch from '~/components/TheHeaderSearch.vue';

export default {
  components: {
    Logo,
    Controls,
    MenuButton,
    SearchButton,
    Header,
    TheHeaderSearch,
    Menu,
    Link
  },

  computed: {
    menuOpen() {
      return this.$store.state.header.menuOpen;
    },
    searchOpen() {
      return this.$store.state.header.searchOpen;
    }
  },

  methods: {
    setHeaderState(payload) {
      this.$store.commit('setHeader', payload);
    },
    closeHeader() {
      this.setHeader({
        menuOpen: false,
        searchOpen: false
      });
    }
  },

  mixins: {
    homeScrollTop: Function
  },

  watch: {
    $route() {
      if (this.menuOpen || this.searchOpen) {
        this.closeHeader();
      }
    }
  }
};
</script>
