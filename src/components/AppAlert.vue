<template>
  <div class="alert">
    <div class="alert__item error" v-for="(error, index) in errors.slice(0, 4)" :key="index">
      <div class="alert__text">
        {{ error }}
      </div>
      <button type="button" class="alert__close" @click="closeError(index)"></button>
    </div>
    <div class="alert__item success" v-for="(success, index) in successes" :key="index">
      <div class="alert__text">
        {{ success }}
      </div>
      <button type="button" class="alert__close" @click="closeSuccess(index)"></button>
    </div>
    <div class="alert__item info" v-for="(info, index) in infos" :key="index">
      <div class="alert__text">
        {{ info }}
      </div>
      <button type="button" class="alert__close" @click="closeInfo(index)"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const errors = computed(() => store.getters.errors)
const successes = computed(() => store.getters.successes)
const infos = computed(() => store.getters.infos)

const closeError = (index: number): void => {
  store.dispatch('removeError', {
    index,
    timeout: 0
  })
}

const closeInfo = (index: number): void => {
  store.dispatch('removeInfo', {
    index,
    timeout: 0
  })
}

const closeSuccess = (index: number): void => {
  store.dispatch('removeSuccess', {
    index,
    timeout: 0
  })
}
</script>

<style scoped lang="scss">
@import '@/assets/colors';

$transparentized-white: transparentize($white, 0.75);

.alert {
  position: fixed;
  top: 10%;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;

  --white-space-size: 28px;

  &__item {
    min-height: 80px;
    min-width: 200px;
    border-radius: 8px;
    color: $white;
    display: grid;
    grid-template-columns: 1fr calc(var(--white-space-size) * 1.2);
    align-items: center;
    gap: 15px;
    padding: 15px;

    &.error {
      background-color: $red;
    }

    &.info {
      background-color: $blue;
    }

    &.success {
      background-color: $green;
    }
  }

  &__text {
    font-weight: 400;
    font-size: 16px;
  }

  &__close {
    width: calc(var(--white-space-size) * 1.2);
    height: calc(var(--white-space-size) * 1.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: $transparentized-white;
    }

    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 2px;
      height: calc(var(--white-space-size) * 0.6);
      background-color: white;
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  }
}
</style>
