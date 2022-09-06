<template>
  <div class="paginator">
    <div class="paginator__buttons">
      <button class="paginator__button" :class="{ active: page === pageNumber }" v-for="pageNumber in pages"
              :key="pageNumber" @click="changePage(pageNumber)">
        {{ pageNumber }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, onBeforeMount, defineEmits } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  pageSize: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['change-page'])

const store = useStore()
const linksCount = computed(() => store.getters['Links/linksCount'])
const pages = ref([])

onBeforeMount(async () => {
  await store.dispatch('Links/getLinksCount')
  pages.value = [...Array(Math.ceil(linksCount.value / props.pageSize)).keys()].map((item: number) => item + 1)
})

const page = ref(1)

const changePage = (pageNumber: number): void => {
  emit('change-page', pageNumber)
  page.value = pageNumber
}
</script>

<style scoped lang="scss">
@import '@/assets/colors';

.paginator {
  display: flex;
  justify-content: center;

  &__buttons {
    display: flex;
    gap: 10px;
  }

  &__button {
    width: 40px;
    height: 40px;
    font-weight: 500;
    border-radius: 33.333333%;

    &:hover,
    &.active {
      background-color: $blue;
      color: $white;
    }
  }
}
</style>
