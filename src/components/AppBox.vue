<script setup lang="ts">
  defineProps({
    active: {
      type: Boolean,
    },
  })
</script>

<template>
  <div tabindex="0" :class="`app-card ${active ? 'active' : ''}`">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .app-card {
    background-color: var(--white);
    border: solid 1px var(--light-gray);
    border-radius: 5px;
    padding: 15px;
    transition: all var(--transition-duration) ease;
    cursor: pointer;
    &:hover, &.active {
      background-color: var(--magnolia);
      border: solid 1px var(--marine-blue);
    }
  }
</style>

