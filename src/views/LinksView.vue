<template>
  <div class="links">
    <div class="links__wrapper">
      <h1 class="links__title">Your Links</h1>
      <button class="links__create button" @click.prevent="showAddLink = true">Create link</button>
      <div class="links__table table">
        <div class="table__line table__sort">
          <button class="table__sort-button" type="button" @click="sort('short')">
            <span>short</span>
            <svg class="table__sort-arrow" :class="{ rotated: sortType === 'asc' }" v-if="sortBy === 'short'"
                 xmlns="http://www.w3.org/2000/svg" width="12" height="8" fill="none">
              <path stroke="#2c3e50" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="m11 1.5-5 5-5-5"/>
            </svg>
          </button>
          <button class="table__sort-button" type="button" @click="sort('target')">
            <span>target</span>
            <svg class="table__sort-arrow" :class="{ rotated: sortType === 'asc' }" v-if="sortBy === 'target'"
                 xmlns="http://www.w3.org/2000/svg" width="12" height="8" fill="none">
              <path stroke="#2c3e50" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="m11 1.5-5 5-5-5"/>
            </svg>
          </button>
          <button class="table__sort-button" type="button" @click="sort('counter')">
            <span>counter</span>
            <svg class="table__sort-arrow" :class="{ rotated: sortType === 'asc' }" v-if="sortBy === 'counter'"
                 xmlns="http://www.w3.org/2000/svg" width="12" height="8" fill="none">
              <path stroke="#2c3e50" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="m11 1.5-5 5-5-5"/>
            </svg>
          </button>
        </div>
        <div class="table__line" v-for="link in links" :key="link.id">
          <div class="table__line-link">
            <button class="copy" type="button" @click="copy(makeURLByShort(link.short))">Copy</button>
            <a :href="makeURLByShort(link.short)" target="_blank">{{ makeURLByShort(link.short) }}</a>
          </div>
          <div class="table__line-link">
            <button class="copy" type="button" @click="copy(link.target)">Copy</button>
            <a :href="link.target" target="_blank">{{ link.target }}</a>
          </div>
          <span class="table__line-counter">{{ link.counter }}</span>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="#app">
    <AddLink v-if="showAddLink" @close="createLink"/>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import AddLink from '@/components/AddLink.vue'

const showAddLink = ref(false)

const store = useStore()

const sortType = ref('desc')
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
    sortType.value = 'desc'
  }
  return await getStatistics()
}

const createLink = async () => {
  showAddLink.value = false
  return await getStatistics()
}
</script>

<style scoped lang="scss">
@import '@/assets/colors';

.links {
  min-height: 100vh;
  padding-top: 58px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__title {
    text-align: center;
  }

  &__create {
    align-self: flex-end;
  }

  &__table {
  }
}

.table {
  border: 1px solid $grey;

  &__line {
    display: grid;
    grid-template-columns: 300px 1fr 120px;

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
      grid-template-columns: auto 1fr;
      text-align: center;
      align-items: center;
      padding: 0;

      > * {
        height: 100%;
        padding-inline: 10px;
        transition: 200ms;

        &:hover {
          background-color: $black;
          color: $white;
        }
      }

      button.copy {
        border-right: 1px solid $grey;
        color: $blue;

        &:hover {
          color: $white;
        }
      }

      a {
        display: flex;
        align-items: center;
        text-align: left;
        overflow: hidden;
      }
    }

    &-counter {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__sort {
    &-button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      transition: 200ms;

      &:hover {
        background-color: $black;
        color: $white;

        > svg > path {
          stroke: $white;
        }
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
