<template>
  <div class="blog" id="blog">
    <Spinner1/>
    <div class="interface">
      <TheHeader/>
      <main role="main">
        <nuxt/>
      </main>
      <TheFooter/>
    </div>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'
import Spinner1 from '~/components/Spinner1'

export default {
  components: {
    TheHeader,
    TheFooter,
    Spinner1
  }
}
</script>

<style lang="scss">
@import '~assets/css/vars.scss';

.blog * {
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
  transition: background-color 0.8s;
  transition-timing-function: cubic-bezier(.11,.89,.31,.99);

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

#blog {
  > .interface {
    display: flex;
    flex-direction: column;
    opacity: 0;
    overflow: hidden;
    padding-top: 80px;

    @media (max-width: 700px) {
      padding-top: 60px;
    }
  }

  > .spinner {
    display: block;
    left: calc(50% - 20px);
    position: absolute;
    top: calc(50vh - 20px - 64px);
    z-index: 10;
  }
}

html.wf-active #blog {
  > .interface  {
    transition: 0.5s;
    opacity: 1;
  }

  > .spinner {
    display: none;
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
  font-weight: 400;
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
  background-color: #cecece;
  position: relative;

  img {
    backface-visibility: hidden;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s;
    width: 100%;
  }

  [lazy=loading] {
    opacity: 0;
  }

  [lazy=loaded] {
    opacity: 1;
  }

  [lazy=loading] + .spinner {
    opacity: 1;;
  }

  .spinner {
    left: 50%;
    margin: -20px;
    opacity: 0;
    position: absolute;
    top: 50%;
  }
}

.infinite-loading-container {
  min-height: calc(64px * 2 + 40px) !important;
  padding: 64px;
}

.infinite-status-prompt {
  padding: 0 !important;
  position: relative;

  span {
    display: block;
  }

  svg {
    display: block;
    fill: rgba($primary, .45);
    width: 40px;
    height: 40px;
    position: relative;
    margin: auto;
  }

  div {
    bottom: -26px;
    color: rgba($primary, .65);
    font-size: 14px;
    left: 0;
    position: absolute;
    text-align: center;
    width: 100%;
  }
}

.spinner {
  position: relative;
  margin: auto;
}
</style>
