<template>
  <div class="authorization">
    <div class="authorization__wrapper">
      <div class="authorization__info">
        <h1>Authorization</h1>
        <span>made by dazeGG</span>
      </div>
      <div class="authorization__form">
        <div class="form">
          <h1 class="form__title">Login Form</h1>
          {{ username }}
          <div class="form__item">
            <label :for="usernameID" class="label">Username</label>
            <input :id="usernameID" type="text" class="input" placeholder="Enter your username" v-model="username">
          </div>
          {{ password }}
          <div class="form__item">
            <label :for="passwordID" class="label" style="margin-top: 20px;">Password</label>
            <input :id="passwordID" type="password" class="input" placeholder="Enter your password" v-model="password">
          </div>
          <button type="submit" class="form__item form__submit button" @click="submit">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
@import '@/assets/colors';

.form {
  width: 60%;

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
}

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

  &__form {
    display: flex;
    justify-content: center;
  }
}
</style>
