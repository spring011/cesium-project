<template>
  <div class="wrapper">
    <ThunderMap></ThunderMap>
  </div>
</template>

<script setup lang="ts">
import ThunderMap from '@/views/thunder/Index.vue';
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 60%;
    padding-top:100px;
    overflow: auto;
  }
</style>
