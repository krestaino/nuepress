<template>
  <div id="app">
    <SiteNav/>
    <nuxt/>
  </div>
</template>

<script>
import SiteNav from '../components/SiteNav'

export default {
  components: {
    SiteNav
  }
}
</script>

<style lang="scss">
@import './node_modules/reset-css/_reset.scss';
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700|Roboto:300,400,700');

.page-enter-active, .page-leave-active {
  transition: opacity .15s;
}

.page-enter, .page-leave-active {
  opacity: 0;
  visibility: hidden;
}

html {
  font-family: 'Open Sans', sans-serif;
  font-kerning: normal;
  font-size: 20px;
  min-height: 100%;
  text-size-adjust: none;
}

body {
  background-color: #efefef;
  line-height: 28px;
  min-height: 100vh;
}

.outer-container {
  margin: 0 auto;
  max-width: 980px;
}
</style>
