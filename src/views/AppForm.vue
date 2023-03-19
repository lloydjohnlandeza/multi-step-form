<template>
  <main>
    <AppStepper />
  </main>
</template>

<script setup lang="ts">
import AppStepper from '../components/AppStepper.vue'
</script>

<style scoped>
  main {
    max-width: 1440px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
