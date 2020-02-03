<template>
  <h1
    class="text-xl md:text-xl cursor-pointer flex plain-link"
    @click="$emit('click')"
    v-html="meta.name"
  ></h1>
</template>

<script>
export default {
  computed: {
    meta() {
      return this.$store.state.meta;
    }
  }
};
</script>
