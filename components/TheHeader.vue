<template>
  <header>
    <Sticky>
      <Logo @click="() => homeScrollTop()" />

      <DesktopMenu>
        <Link to="/" name="Latest Articles" />
        <Link to="/topics" name="Topics" />
        <Link to="/authors" name="Authors" />
        <Link to="/pages/about" name="About" />
      </DesktopMenu>

      <Controls>
        <SearchButton @click="() => setHeaderState({ menuOpen: false, searchOpen: !searchOpen })" />
        <MenuButton @click="() => setHeaderState({ menuOpen: !menuOpen, searchOpen: false })" />
      </Controls>
    </Sticky>
    <Drawer>
      <Search />

      <MobileMenu>
        <Link to="/" name="Latest Articles" />
        <Link to="/topics" name="Topics" />
        <Link to="/authors" name="Authors" />
        <Link to="/pages/about" name="About" />
      </MobileMenu>
    </Drawer>
  </header>
</template>

<script>
import Drawer from '~/components/TheHeader/Drawer.vue';
import Sticky from '~/components/TheHeader/Sticky.vue';
import Logo from '~/components/TheHeader/Logo.vue';
import DesktopMenu from '~/components/TheHeader/DesktopMenu.vue';
import MobileMenu from '~/components/TheHeader/MobileMenu.vue';
import Link from '~/components/TheHeader/Link.vue';
import Search from '~/components/TheHeader/Search.vue';
import Controls from '~/components/TheHeader/Controls.vue';
import MenuButton from '~/components/TheHeader/MenuButton.vue';
import SearchButton from '~/components/TheHeader/SearchButton.vue';

export default {
  components: {
    Drawer,
    Logo,
    Controls,
    MenuButton,
    SearchButton,
    Sticky,
    Search,
    DesktopMenu,
    MobileMenu,
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
      this.setHeaderState({
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
