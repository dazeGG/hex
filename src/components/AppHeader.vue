<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper" v-if="auth">
        <router-link :to="Routes.links" class="header__logo">dazeGG</router-link>
        <button class="header__login button red" @click="logout">Logout</button>
      </div>
      <div class="header__wrapper" v-else>
        <router-link :to="Routes.home" class="header__logo">dazeGG</router-link>
        <router-link :to="Routes.authorization" class="header__login button">Login</router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Routes from '@/router/Routes'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const auth = computed(() => store.getters['Auth/isAuth'])

const router = useRouter()
const store = useStore()

const logout = () => {
  localStorage.removeItem('access_token')
  store.commit('Auth/setIsAuth', false)
  router.push({ path: Routes.home })
}
</script>

<style lang="scss">
@import '@/assets/colors';

.header {
  position: fixed;
  width: 100%;
  backdrop-filter: blur(3px);

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
