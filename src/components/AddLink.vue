<template>
  <div class="add-link">
    <div class="add-link__overflow" @click="emit('close')"></div>
    <div class="add-link__wrapper">
      <input type="text" class="add-link__input" placeholder="Input or paste link..." v-model="link">
      <button class="add-link__accept" :class="{ active: !!link }" :disabled="!link" @click="createLink">
        <img src="@/assets/check.svg" alt="">
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useStore } from 'vuex'

const emit = defineEmits(['close'])
const store = useStore()

const link = ref('')

const createLink = async () => {
  await store.dispatch('Links/createLink', link.value)
  emit('close')
}
</script>

<style scoped lang="scss">
@import '@/assets/colors';

.add-link {
  &__overflow {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: transparentize($black, 0.25);
    backdrop-filter: blur(3px);
  }

  &__wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: 10px;
    width: 50%;
  }

  &__input {
    color: $white;
    font-size: 28px;
    border-bottom: 1px solid transparent;
    padding-bottom: 5px;
    text-align: center;
    width: 100%;

    &::placeholder {
      color: transparentize($white, 0.5);
    }

    &:focus {
      outline: none;
      border-bottom: 1px solid $white;
    }
  }

  &__accept {
    width: 38px;
    filter: grayscale(1);
    opacity: 0.2;
    cursor: default;

    &.active {
      filter: grayscale(0);
      opacity: 1;
      cursor: pointer;
    }
  }
}
</style>
