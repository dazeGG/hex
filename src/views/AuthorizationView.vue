<template>
  <RegAuthForm :mode="Mode.Authorization"/>
</template>

<script setup lang="ts">
import RegAuthForm from '@/components/RegAuthForm/RegAuthForm.vue'
import Mode from '@/components/RegAuthForm/Mode'
</script>
