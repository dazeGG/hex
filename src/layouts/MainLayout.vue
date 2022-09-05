<template>
  <div class="layout">
    <AppHeader/>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<style scoped lang="scss">
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
