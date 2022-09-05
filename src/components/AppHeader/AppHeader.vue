<template>
  <header class="header">
    <div class="container">
      <AppHeaderAuth v-if="auth"/>
      <AppHeaderNotAuth v-else/>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppHeaderAuth from '@/components/AppHeader/components/AppHeaderAuth.vue'
import AppHeaderNotAuth from '@/components/AppHeader/components/AppHeaderNotAuth.vue'
// import { useStore } from 'vuex'
import { ref } from 'vue'

// const store = useStore()

const auth = ref(false)
</script>

<style lang="scss">
@import '@/assets/colors';

.header {
  position: fixed;
  width: 100%;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 10px;
  }

  &__logo {
    font-size: 28px;
    font-weight: 500;
    color: $black;
    text-decoration: none;
  }

  &__login {
  }
}
</style>
