<script setup lang="ts">
  import { useAttrs, computed } from 'vue';
  import type { InputHTMLAttributes } from 'vue';
  import type { ErrorObject } from '@vuelidate/core'

  const props = defineProps({
    label: { type: String, required: false },
    errors: { type: Array<ErrorObject>, required: false }
  })

  const attrs: InputHTMLAttributes = useAttrs();

  const displayFirstError = computed(() => {
    if (props.errors?.length) {
      return props.errors[0].$message
    }
    return ''
  })
</script>

<template>
  <div class="input-container">
    <label v-if="label" :for="attrs.name">
      <span>{{label}}</span>
      <span v-if="errors?.length">{{displayFirstError}}</span>
    </label>
    <input v-bind="attrs" />
  </div>
</template>

<style lang="scss" scoped>
  label {
    color: var(--color-heading);
    font-size: var(--h6);
    display: flex;
    justify-content: space-between;
    span {
      font-weight: 500;
      &:nth-child(2) {
        font-weight: 700;
        color: var(--strawberry-red);
      }
    }
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


