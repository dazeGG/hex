<template>
  <RegAuthForm :mode="Mode.Registration"/>
</template>

<script setup lang="ts">
import RegAuthForm from '@/components/RegAuthForm/RegAuthForm.vue'
import Mode from '@/components/RegAuthForm/Mode'
</script>
