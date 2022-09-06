<template>
  <div class="links">
    <div class="links__wrapper">
      <h1 class="links__title">Your Links</h1>
      {{ links }}
      <div class="links__table table">
        <div class="table__line table__sort">
          <span>id</span>
          <button class="table__sort-button" type="button" @click="sort('short')">
            <span>short</span>
            <img class="table__sort-arrow" :class="{ rotated: sortType === 'desc' }" src="@/assets/arrow.svg" alt=""
                 v-if="sortBy === 'short'">
          </button>
          <button class="table__sort-button" type="button" @click="sort('target')">
            <span>target</span>
            <img class="table__sort-arrow" :class="{ rotated: sortType === 'desc' }" src="@/assets/arrow.svg" alt=""
                 v-if="sortBy === 'target'">
          </button>
          <button class="table__sort-button" type="button" @click="sort('counter')">
            <span>counter</span>
            <img class="table__sort-arrow" :class="{ rotated: sortType === 'desc' }" src="@/assets/arrow.svg" alt=""
                 v-if="sortBy === 'counter'">
          </button>
        </div>
        <div class="table__line" v-for="(link, index) in links" :key="index">
          <span>{{ link.short }}</span>
          <div class="table__line-link">
            <button type="button" @click="copy(makeURLByShort(link.short))">Copy</button>
            <a :href="makeURLByShort(link.short)" target="_blank">Open</a>
          </div>
          <div class="table__line-link">
            <button type="button" @click="copy(link.target)">Copy</button>
            <a :href="link.target" target="_blank">Open</a>
          </div>
          <span>{{ link.counter }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const sortType = ref('asc')
const sortBy = ref('short')
const offset = ref(0)
const limit = ref(0)

const getStatistics = async (): Promise<void> => await store.dispatch('Links/getStatistics', {
  order: `${sortType.value}_${sortBy.value}`,
  offset: offset.value,
  limit: limit.value
})

onMounted(async (): Promise<void> => await getStatistics())

const links = computed(() => store.getters['Links/links'])

const makeURLByShort = (short: string): string => `${process.env.VUE_APP_API_URI}/s/${short}`
const copy = (text: string): Promise<void> => navigator.clipboard.writeText(text)

const toggleSortType = (): string => (sortType.value = sortType.value === 'desc' ? 'asc' : 'desc')

const sort = async (_sortBy: 'short' | 'target' | 'counter'): Promise<void> => {
  if (_sortBy === sortBy.value) {
    toggleSortType()
  } else {
    sortBy.value = _sortBy
    sortType.value = 'asc'
  }
  return await getStatistics()
}
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
    grid-template-columns: 120px 1fr 1fr 120px;

    &:first-child {
      font-weight: 500;
    }

    &:not(:first-child) {
      border-top: 1px solid $grey;
    }

    > span {
      text-align: center;
    }

    > * {
      padding: 10px;

      &:not(:first-child) {
        border-left: 1px solid $grey;
      }
    }

    &-link {
      display: grid;
      grid-template-columns: 1fr 1fr;
      text-align: center;
      align-items: center;
      padding: 0;

      > * {
        height: 100%;

        &:hover {
          background-color: $grey;
        }
      }

      button[type=button] {
        border-right: 1px solid $grey;
        color: $blue;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &__sort {
    &-button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      &:hover {
        background-color: $grey;
      }
    }

    &-arrow {
      transition: 200ms;
      transform: rotate(0deg);

      &.rotated {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
