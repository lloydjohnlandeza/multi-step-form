<template>
  <main>
    <Stepper />
    <Step />
  </main>
</template>

<script setup lang="ts">
import Stepper from '../components/Stepper.vue'
import Step from '../components/Step.vue'
</script>

<style scoped>
  main {
    max-width: 1440px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
