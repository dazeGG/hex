<template>
  <div class="links">
    <div class="links__wrapper">
      <h1 class="links__title">Your Links</h1>
      {{ links }}
      <div class="links__table table">
        <div class="table__line table__sort">
          <button type="button">short</button>
          <button type="button">target</button>
          <button type="button">counter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const order = ref('asc_short')
const offset = ref(0)
const limit = ref(0)

onMounted(async () => {
  await store.dispatch('Links/getStatistics', {
    order: order.value,
    offset: offset.value,
    limit: limit.value
  })
})

const links = computed(() => store.getters['Links/links'])
</script>

<style scoped lang="scss">
@import '@/assets/colors';

.links {
  min-height: 100vh;
  padding-top: 58px;

  &__title {
    text-align: center;
  }

  &__table {
    margin-top: 20px;
  }
}

.table {
  border: 1px solid $grey;

  &__line {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    > *:not(:first-child) {
      border-left: 1px solid $grey;
    }
  }

  &__sort {
    > button {
      padding-block: 10px;

      &:hover {
        background-color: $grey;
      }
    }
  }
}
</style>
