<template>
  <div id="blog">
    <blog-header/>
    <nuxt/>
    <blog-footer/>
  </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader'
import BlogFooter from '../components/BlogFooter'

export default {
  components: {
    BlogHeader,
    BlogFooter
  }
}
</script>

<style lang="scss">
@import './assets/css/vars.scss';

* {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-repeat: no-repeat;
  box-sizing: border-box;
  position: relative;
  transition-timing-function: cubic-bezier(.11,.89,.31,.99);
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

html {
  background-color: #f5f5f5;
  color: $primary;
  font-family: 'Roboto Slab', serif;
  font-kerning: normal;
  font-size: 19px;
  font-weight: 400;
  overflow-y: scroll;
}

body {
  font-size: 0.85rem;
  font-weight: 300;
  line-height: 1.765em;
}

#blog {
  display: flex;
  // filter: drop-shadow(0px 0px 50px rgba(0,0,0,0.2));
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  padding-top: 80px;
}

main {
  background-color: #efefef;
  min-height: calc(100vh - 80px - 200px);
}

main.page-enter-active {
  transition: opacity .2s;
}

main.page-enter, main.page-leave-active {
  opacity: 0;
}

.outer-container {
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
}

.page-title {
  border-bottom: 1px dotted lighten($primary, 20%);
  margin-top: 32px;
  margin-bottom: 48px;

  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 3rem;
    font-weight: 100;
    line-height: 1;
    margin-bottom: 12px;
    margin-top: 0;
    padding-bottom: 0;
  }
}

h1, h2, h3, h4, h5 {
  color: #333;
  font-weight: 400;
}

a {
  color: $primary;
  position: relative;
  text-decoration: none;
  transition: 0.1s;
}

a.fancy {
  &:hover {
    color: $accent;
  }

  &::after {
    background: rgba($accent, 0.5);
    content: '';
    height: 1px;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 100%;
    transform: translateY(-4px);
    transition: height 0.1s, opacity 0.1s, transform 0.1s;
    width: 100%;
  }

  &:hover,
  &:focus {
    &::after {
      height: 4px;
      opacity: 1;
      transform: translateY(0px);
    }
  }
}

pre {
  white-space: pre-wrap;
}
</style>
