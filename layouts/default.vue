<template>
  <div id="app">
    <SiteNav/>
    <nuxt/>
    <SiteFoot/>
  </div>
</template>

<script>
import SiteNav from '../components/SiteNav'
import SiteFoot from '../components/SiteFoot'
import 'normalize.css'

export default {
  components: {
    SiteNav,
    SiteFoot
  }
}
</script>

<style lang="scss">
@import './assets/css/vars.scss';
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700|Roboto:300,400,700');

.page-enter-active, .page-leave-active {
  transition: opacity .1s;
}

.page-enter, .page-leave-active {
  opacity: 0;
}

.page-leave-active {
  visibility: hidden;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

html {
  font-family: 'Open Sans', sans-serif;
  font-kerning: normal;
  font-size: 20px;
  font-weight: 400;
  min-height: 100%;
  overflow-y: scroll;
  text-size-adjust: none;
}

body {
  background-color: #f5f5f5;
  color: $primary;
  line-height: 30px;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.outer-container {
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
}

h1.page-title {
  font-size: 150%;
  margin-bottom: 32px;
  margin-top: 48px;
}

a {
  color: $primary;
  text-decoration: none;
}

pre {
  white-space: pre-wrap;
}

h1, h2, h3, h4, h5 {
  color: #333;
  font-weight: 400;
}
</style>
