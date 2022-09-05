<template>
  <div class="authorization">
    <div class="authorization__wrapper">
      <div class="authorization__info">
        <h1 v-if="props.mode === Mode.Registration">Registration</h1>
        <h1 v-else>Authorization</h1>
        <span>made by dazeGG</span>
      </div>
      <div class="authorization__form">
        <RegistrationForm v-if="props.mode === Mode.Registration"/>
        <AuthorizationForm v-else/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthorizationForm from './components/AuthorizationForm.vue'
import RegistrationForm from './components/RegistrationForm.vue'
import { defineProps } from 'vue'
import Mode from './Mode'

const props = defineProps({
  mode: {
    type: Number as () => Mode,
    default: Number as () => Mode.Authorization
  }
})
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

  &__form {
    display: flex;
    justify-content: center;
  }
}
</style>
