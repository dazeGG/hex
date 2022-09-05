<template>
  <div class="form">
    <h1 class="form__title">Login Form</h1>
    <div class="form__item">
      <label :for="usernameID" class="label">Username</label>
      <input :id="usernameID" type="text" class="input" placeholder="Enter your username" v-model="username">
    </div>
    <div class="form__item">
      <label :for="passwordID" class="label">Password</label>
      <input :id="passwordID" type="password" class="input" placeholder="Enter your password" v-model="password">
    </div>
    <button type="submit" class="form__item form__submit button" @click="submit">Login</button>
    <router-link :to="Routes.registration" class="form__register">
      <span>Create an account</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import Routes from '@/router/Routes'
import { uid } from 'uid'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const usernameID = uid()
const passwordID = uid()

const username = ref('')
const password = ref('')

const submit = () => {
  console.log('submit')
  router.push('/')
}
</script>

<style scoped lang="scss">
.form {
  width: 60%;
  display: flex;
  flex-direction: column;

  &__title {
    text-align: center;
    margin-bottom: 40px;
  }

  &__item:not(:first-child) {
    margin-top: 20px;
  }

  &__submit {
    width: 100%;
    margin-top: 20px;
  }

  &__register {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
