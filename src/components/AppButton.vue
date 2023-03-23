<script setup lang="ts">
  import type { PropType } from 'vue'

  type Type = 'primary' | 'secondary' | 'text'
  type ButtonType = 'submit' | 'reset' | 'button'

  defineProps({
    buttonType: {
      type: String as PropType<ButtonType>,
      default: 'button',
    },
    type: {
      type: String as PropType<Type>,
      default: 'primary',
    },
  })
</script>

<template>
  <button :type="buttonType" :class="type">
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
