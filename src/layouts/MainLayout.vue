<template>
  <AppHeader/>
  <div class="container">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader/AppHeader.vue'
</script>
