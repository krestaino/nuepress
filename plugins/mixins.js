import Vue from 'vue';
import { differenceInDays, format, formatDistanceStrict } from 'date-fns';

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

    /**
     * Handles the click event of the header logo
     */
    homeScrollTop() {
      if (window.location.pathname === '/') {
        this.$scrollTo(document, 500);
      } else {
        this.$router.push('/');
      }
    },

    /**
     * Returns the featured media object of the given article and size
     * @param {Object} article
     * @param {String} size
     * @return {Object} featured media object
     */
    getFeaturedImage(article, size) {
      const featuredImage = article._embedded['wp:featuredmedia'];

      if (featuredImage) {
        return featuredImage[0].media_details.sizes[size];
      }
    }
  }
});
