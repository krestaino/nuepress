<template>
  <div>
    <article v-for="post in posts">
      <div class="row date">
        <span v-html="timestamp(post.date)"></span>&nbsp;–&nbsp;<nuxt-link class="topic" v-for="topic in post._embedded['wp:term'][0]" :to="`/topics/${topic.slug}`" v-html="topic.name"></nuxt-link>
      </div>
      <nuxt-link :to="`/${post.slug}`" class="row">
        <div class="col">
          <img v-if="post._embedded['wp:featuredmedia']" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url">
        </div>
        <div class="col">
          <h2 v-html="post.title.rendered"></h2>
          <div v-html="post.excerpt.rendered"></div>
        </div>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['posts'],

  methods: {
    timestamp (date) { return moment(date).format('MMM d') }
  }
}
</script>

<style lang="scss">
@import './assets/css/vars.scss';

section {
  margin: 0 auto;
}

article {
  & + article {
    border-top: 1px dotted $primary;
    margin-top: 32px;
    padding-top: 32px;
  }

  .row {
    display: flex;
    
    & + .row {
      margin-top: 16px;
    }

    .col {
      display: flex;
      flex-direction: column;
    }
  }

  .date {
    font-family: 'Roboto', sans-serif;
    font-size: 70%;
    text-transform: uppercase;

    .topic + .topic::before {
      content: ', ';
      color: $primary;
    }
  }
}

h2 {
  color: #111;
  font-size: 110%;
  margin-bottom: 8px;
  margin-top: -6px;
}

img {
  height: auto;
  margin: 0 22px 0 0;
  max-width: 150px;
}

a {
  color: $primary;
  transition: 0.1s;
  text-decoration: none;

  &:hover {
    color: darken($primary, 30%)
  }
}
</style>
