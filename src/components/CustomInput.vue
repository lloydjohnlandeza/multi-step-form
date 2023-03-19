<script setup lang="ts">
  import type { InputHTMLAttributes, useAttrs } from 'vue';

  defineProps({
    label: { type: String, required: false },
  })
  const attrs: InputHTMLAttributes = useAttrs();

</script>

<template>
  <div class="input-container">
    <label v-if="label" :for="attrs.name">{{label}}</label>
    <input v-bind="attrs" />
  </div>
</template>

<style lang="scss" scoped>
  label {
    color: var(--color-heading);
    font-size: var(--h6);
    font-weight: 500;
  }
  input {
    /* Remove default styles */
    appearance: none;
    border: none;
    outline: none;

    border: solid 1px var(--light-gray);
    transition: all var(--transition-duration) ease;
    font-size: 16px;
    font-family: 'Ubuntu';
    font-weight: 400;
    padding: 10px;
    border-radius: 10px;
    color: var(--marine-blue);
    width: 100%;

    &::placeholder {
      color: var(--cool-gray);
    }
    &::-webkit-input-placeholder {
      color: var(--cool-gray);
    }
    &:-moz-placeholder {
      color: var(--cool-gray);
    }
    &::-moz-placeholder {
      color: var(--cool-gray);
    }
    &:-ms-input-placeholder {
      color: var(--cool-gray);
    }

    &:focus {
      border: none;
      outline: none;
      border: solid 1px var(--cool-gray);
    }
  }
</style>


