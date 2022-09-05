<template>
  <div class="header__wrapper">
    <router-link :to="Routes.home" class="header__logo">dazeGG</router-link>
    <router-link :to="Routes.authorization" class="header__login button">Login</router-link>
  </div>
</template>

<script setup lang="ts">
import Routes from '@/router/Routes'
</script>
