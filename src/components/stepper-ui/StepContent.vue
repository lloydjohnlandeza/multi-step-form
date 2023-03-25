<script setup lang="ts">
  defineProps({
    title: { type: String, required: false },
    description: { type: String, required: false },
  })

</script>

<template>
  <div class="card">
    <h2 v-if="title">{{title}}</h2>
    <p v-if="description">{{description}}</p>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    max-height: 70vh;
    p {
      margin-bottom: 20px;
    }
    overflow: auto;
    max-width: 100%;
    @media (max-width: 767px) {
      background-color: var(--white);
      border-radius: 20px;
      padding: 20px;
      margin: 15px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
</style>


