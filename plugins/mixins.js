import Vue from 'vue';
import { differenceInDays, format, formatDistanceStrict } from 'date-fns';
import * as Vibrant from 'node-vibrant';

Vue.mixin({
  methods: {
    /**
     * Returns formatted date depending on how old it is.
     * If older than 6 days, return formatted like '2 days ago',
     * otherwise return formatted like 'Aug 2'.
     * @param {String} date
     * @return {String} formatted date
     */
    shortTimestamp(date) {
      const articleDate = new Date(date);
      const todayDate = new Date();

      if (differenceInDays(todayDate, articleDate) > 6) {
        return format(articleDate, 'MMM d');
      } else {
        return formatDistanceStrict(articleDate, todayDate, { addSuffix: true });
      }
    },
    /**
     * Returns date formatted like 'May 9, 2017'
     * @param {String} date
     * @return {String} formatted date
     */
    longTimestamp(date) {
      return format(new Date(date), 'MMM d, yyyy');
    },

    homeScrollTop() {
      if (window.location.pathname === '/') {
        this.$scrollTo(document, 500);
      } else {
        this.$router.push('/');
      }
    },

    getAuthor(article) {
      return article._embedded.author[0];
    },

    getFeaturedImage(article, size) {
      const featuredImage = article._embedded['wp:featuredmedia'];
      return featuredImage[0].media_details.sizes[size] || false;
    },

    getColorAccentStyles(article) {
      return new Promise(function(resolve, reject) {
        const image =
          article._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;

        Vibrant.from(image).getPalette((err, palette) => {
          if (!err && palette.DarkMuted) {
            const { r, g, b } = palette.DarkMuted;

            resolve(`
              <style>
                html,
                .featured-image .image-height {
                  background: rgb(${r},${g},${b}) !important
                }
                main a {
                  color: rgb(${r},${g},${b}) !important
                }
                main a:hover {
                  color: rgb(${r},${g},${b}) !important
                }
                main a::after {
                  background: rgb(${r},${g},${b}) !important
                }
              </style>
            `);
          } else {
            reject(err);
          }
        });
      });
    }
  }
});
