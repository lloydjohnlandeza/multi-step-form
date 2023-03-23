<script setup lang="ts">
  import { defineEmits } from 'vue';

  const props = defineProps({
    labelOff: { type: String, required: false },
    labelOn: { type: String, required: false },
    value: { type: Boolean, required: true }
  })

  const emit = defineEmits(['change']);

  const handleChange = () => {
    emit('change', !props.value)
  }
</script>

<template>
  <div class="toggle-container">
    <label v-if="labelOff" :class="`text ${!value ? 'on' : ''}`">{{labelOff}}</label>
    <label class="toggle">
      <input :value="value" @change="handleChange" type="checkbox" />
      <span class="slider"></span>
    </label>
    <label v-if="labelOn" :class="`text ${value ? 'on' : ''}`">{{labelOn}}</label>
  </div>
</template>

<style lang="scss" scoped>
  .toggle-container {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 10px;

    .text {
      font-size: 1.25em;
      transition: all var(--transition-duration) ease;
      &.on {
        color: var(--light-gray);
      }
    }
  }
  .toggle {
    position: relative;
    display: inline-block;
    width: 4.8em;
    height: 2.125em;
  }
  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--marine-blue);
    transition: var(--transition-duration);
    border-radius: 2.125em;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.625em;
    width: 1.625em;
    left: 0.25em;
    bottom: 0.25em;
    background-color: white;
    transition: var(--transition-duration);
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: var(--marine-blue);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--marine-blue);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(2.5em);
    -ms-transform: translateX(2.5em);
    transform: translateX(2.5em);
  }
</style>


