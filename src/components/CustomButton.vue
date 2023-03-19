<script setup lang="ts">
  import type { PropType } from "vue";

  type Type = 'primary' | 'secondary' | 'text'

  defineProps({
    type: {
      type: String as PropType<Type>,
      default: 'primary',
      validator(prop: Type) {
        // The value must match one of these strings
        return ['primary', 'secondary', 'text'].includes(prop)
      }
    },
  })
</script>

<template>
  <button :class="type">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  button {
    border: none;
    cursor: pointer;
    padding: 12px 16px;
    border-radius: 5px;
    color: var(--white);
    transition: all var(--transition-duration) ease;
    &.primary {
      background-color: var(--marine-blue);
    }
    &.secondary {
      background-color: var(--purplish-blue);
    }
    &.text {
      color: var(--alabaster);
      background-color: transparent;
      font-weight: 700;
    }
    &:focus, &:hover {
      background-color: var(--alabaster);
      &.text {
        background-color: transparent;
        color: var(--marine-blue);
      }
    }
  }
</style>


