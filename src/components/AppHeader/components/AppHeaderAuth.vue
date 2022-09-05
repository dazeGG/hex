<template>
  <div class="header__wrapper">
    <router-link :to="Routes.links" class="header__logo">dazeGG</router-link>
    <button class="header__login button red" @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import Routes from '@/router/Routes'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const logout = () => {
  localStorage.removeItem('access_token')
  store.commit('Auth/setIsAuth', false)
  router.push({ path: Routes.home })
}
</script>
