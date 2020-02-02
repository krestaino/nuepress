<template>
  <h1
    class="text-xl md:text-2xl cursor-pointer flex"
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
