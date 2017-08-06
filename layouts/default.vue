<template>
  <div id="blog">
    <Spinner1/>
    <div class="interface">
      <BlogHeader/>
      <main role="main">
        <nuxt/>
      </main>
      <BlogFooter/>
    </div>
  </div>
</template>

<script>
import BlogHeader from '../components/Header'
import BlogFooter from '../components/Footer'
import Spinner1 from '~/components/Spinner1'

export default {
  components: {
    BlogHeader,
    BlogFooter,
    Spinner1
  }
}
</script>

<style lang="scss">
@import '~assets/css/vars.scss';

* {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-repeat: no-repeat;
  box-sizing: border-box;
  position: relative;
  transition-timing-function: cubic-bezier(.11,.89,.31,.99);
}

html {
  background-color: #f5f5f5;
  box-sizing: border-box;
  color: $primary;
  font-family: 'Roboto Slab', serif;
  font-kerning: normal;
  font-size: 19px;
  font-weight: 400;
  overflow-y: scroll;

  @media (max-width: 500px) {
    font-size: 18px;
  }
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  font-size: 0.85rem;
  font-weight: 300;
  line-height: 1.765em;
}

#__nuxt {
  #blog > .interface  {
    transition: 0.5s;
  }

  #blog > .spinner {
    display: none;
  }
}

#__nuxt[data-server-rendered=true] {
  #blog > .interface {
    opacity: 0;
  }

  #blog > .spinner {
    display: block;
    left: calc(50% - 20px);
    position: absolute;
    top: calc(50vh - 20px - 64px);
    z-index: 10;
  }
}

#blog {
  div > {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: 80px;
  }

  @media (max-width: 700px) {
    padding-top: 60px;
  }
}

main {
  background-color: #efefef;
  margin: 0 auto;
  max-width: $containerWidth;
  min-height: calc(100vh - 80px - 200px);
  width: 100%;

  @media (max-width: 700px) {
    min-height: calc(100vh - 60px - 200px);
  }
}

.page-enter-active {
  transition: opacity .2s;
}

.page-enter, .page-leave-active {
  opacity: 0;
}

.page-title {
  border-bottom: 1px dotted lighten($primary, 20%);
  margin-top: 32px;
  margin-bottom: 32px;

  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 3rem;
    font-weight: 100;
    line-height: 1;
    margin-bottom: 12px;
    margin-top: 0;
    padding-bottom: 0;

    @media (max-width: 500px) {
      font-size: 2rem;
    }
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
      height: 2px;
      opacity: 1;
      transform: translateY(0px);
    }
  }
}

pre {
  white-space: pre-wrap;
}

.lazy {
  background-color: #bbb;

  div:not(.image-height),
  img {
    backface-visibility: hidden;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s;
    width: 100%;

    &[lazy=loaded] {
      opacity: 1;
    }
  }
}
</style>
