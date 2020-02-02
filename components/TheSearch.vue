<template>
  <Wrapper>
    <Input
      @keyup="query => (searchQuery = query)"
      @keydownUp="up()"
      @keydownDown="down()"
      @keydownEnter="enter()"
      :loading="loading"
    />

    <Results
      :apiResponse="apiResponse"
      :articles="articles"
      :currentSelectedIndex="currentSelectedIndex"
      :searchQuery="searchQuery"
    />
  </Wrapper>
</template>

<script>
import axios from 'axios';
import Wrapper from '~/components/TheSearch/Wrapper.vue';
import Input from '~/components/TheSearch/Input.vue';
import Results from '~/components/TheSearch/Results.vue';

export default {
  components: {
    Input,
    Results,
    Wrapper
  },

  data() {
    return {
      apiResponse: false,
      articles: [],
      currentSelectedIndex: -1,
      searchQuery: '',
      loading: false
    };
  },

  methods: {
    up() {
      this.currentSelectedIndex <= 0
        ? (this.currentSelectedIndex = this.articles.length - 1)
        : this.currentSelectedIndex--;
    },

    down() {
      this.currentSelectedIndex < this.articles.length - 1
        ? this.currentSelectedIndex++
        : (this.currentSelectedIndex = 0);
    },

    enter() {
      const selectedArticle = this.articles[this.currentSelectedIndex];

      if (selectedArticle) {
        this.$router.push(selectedArticle.slug);
      }
    },

    search() {
      this.loading = true;

      axios
        .get(
          `${process.env.WORDPRESS_API_URL}/wp/v2/posts?search=${this.searchQuery}&_embed&per_page=16`
        )
        .then(response => {
          this.apiResponse = true;
          this.loading = false;
          this.articles = response.data;
        });
    }
  },

  watch: {
    searchQuery() {
      this.search();
    },
    $route() {
      this.apiResponse = false;
      this.currentSelectedIndex = -1;
      this.searchQuery = '';
    }
  }
};
</script>
