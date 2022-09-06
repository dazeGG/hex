<template>
  <AppAlert/>
  <AppHeader/>
  <div class="container">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppAlert from '@/components/AppAlert.vue'
</script>
