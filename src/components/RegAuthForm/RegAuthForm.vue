<template>
  <div class="authorization">
    <div class="authorization__wrapper">
      <div class="authorization__info" v-if="props.mode === Mode.Home">
        <h1>HomeView</h1>
        <span>made by dazeGG</span>
        <p style="margin-top: 20px;">On this site you can shorten links and look at the number of clicks on them</p>
        <span class="authorization__login-to-start">
          Sign Up to start
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path fill="#2c3e50" d="m21.9 12-7.5 6.2.6.8 9-7.5L15 4l-.6.8 7.5 6.2H0v1h21.9z"/></svg>
        </span>
      </div>
      <div class="authorization__info" v-else>
        <h1 v-if="props.mode === Mode.Registration">Registration</h1>
        <h1 v-else>Authorization</h1>
        <span>made by dazeGG</span>
      </div>
      <div class="authorization__form">
        <div class="form">
          <h1 class="form__title">{{ formText }} Form</h1>
          <div class="form__item">
            <label :for="usernameID" class="label">Username</label>
            <input :id="usernameID" type="text" class="input" placeholder="Enter your username" v-model="username">
          </div>
          <div class="form__item">
            <label :for="passwordID" class="label">Password</label>
            <input :id="passwordID" type="password" class="input" placeholder="Enter your password" v-model="password">
          </div>
          <button type="submit" class="form__item form__submit button" @click="submit">{{ formText }}</button>
          <div class="form__register" v-if="props.mode === Mode.Registration || props.mode === Mode.Home">
            <router-link :to="Routes.authorization">
              <span>Already have an account</span>
            </router-link>
          </div>
          <div class="form__register" v-else>
            <router-link :to="Routes.registration">
              <span>Create an account</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import Routes from '@/router/Routes'
import Mode from './Mode'
import { uid } from 'uid'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  mode: {
    type: Number as () => Mode,
    default: Number as () => Mode.Authorization
  }
})

const formText = props.mode === Mode.Registration || props.mode === Mode.Home ? 'Sign Up' : 'Login'

const usernameID = uid()
const passwordID = uid()

const username = ref('')
const password = ref('')

const submit = async () => {
  switch (props.mode) {
    case Mode.Registration:
      await store.dispatch('Auth/register', {
        username: username.value,
        password: password.value
      })
      break
    case Mode.Authorization:
      await store.dispatch('Auth/login', {
        username: username.value,
        password: password.value
      })
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/colors';

.authorization {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__wrapper {
    min-height: 60vh;
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
  }

  &__info {
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid $grey;

    > span {
      font-weight: 500;
    }
  }

  &__login-to-start {
    margin-top: 20px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  &__form {
    display: flex;
    justify-content: center;
  }
}

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
