<template>
  <div>
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

<style>
header {
  margin-bottom: 32px;
}
</style>
