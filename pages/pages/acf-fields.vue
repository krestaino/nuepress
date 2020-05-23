<template>
  <Page :data="page" :hideMeta="true" type="page">
    <div class="overflow-hidden">
      <section class="mb-8">
        <h2 class="mb-4 text-2xl">{{ page.acf.gallery_title }}</h2>
        <swiper
          class="bg-gray-100 rounded-lg border border-gray-300 dark:border-gray-600"
          ref="mySwiper"
          :options="swiperOptions"
        >
          <swiper-slide v-for="(item, $index) in page.acf.gallery" :key="$index">
            <div class="bg-gray-100">
              <img :src="item.photo.sizes.large" />
              <p class="pt-2 px-4 pb-12 text-sm">{{ item.caption }}</p>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </section>

      <section class="mb-8">
        <h2 class="mb-4 text-2xl">{{ page.acf.chart_title }}</h2>
        <div class="bg-gray-100 rounded-lg border border-gray-300 dark:border-gray-600">
          <line-chart :chart-data="setChart()" :options="chartOptions"></line-chart>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="mb-4 text-2xl">{{ page.acf.youtube_video_title }}</h2>
        <client-only>
          <YouTube
            class="rounded-lg overflow-hidden"
            player-height="413"
            player-width="734"
            :video-id="page.acf.youtube_video_id"
          />
        </client-only>
      </section>
    </div>
  </Page>
</template>

<script>
import LineChart from '../../plugins/vue-linechart.js';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

import Page from '~/components/ArticleAndPage.vue';

export default {
  async asyncData({ $axios, params }) {
    const page = await $axios.$get(`${process.env.WORDPRESS_API_URL}/wp/v2/pages`, {
      params: {
        slug: params.page,
        _embed: true
      }
    });
    return { page: page[0] };
  },

  components: {
    LineChart,
    Page,
    Swiper,
    SwiperSlide
  },

  data() {
    return {
      chartOptions: {
        layout: {
          padding: {
            left: 16,
            right: 32,
            top: 16,
            bottom: 16
          }
        }
      },
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    };
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },

  methods: {
    setChart() {
      let chartData = {};
      let datasets = [];
      let labels = [];

      this.page.acf.chart_labels.forEach(({ value }) => {
        labels.push(value);
      });

      this.page.acf.chart_data.forEach(({ label, fill, backgroundColor, borderColor, data }) => {
        datasets.push({
          label: label,
          fill: fill,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          data: data.map(({ value }) => value)
        });
      });

      chartData.datasets = datasets;
      chartData.labels = labels;

      return chartData;
    }
  },

  mounted() {
    this.setChart();
  }
};
</script>
