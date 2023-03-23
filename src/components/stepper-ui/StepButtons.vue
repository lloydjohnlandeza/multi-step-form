<script setup lang="ts">
  import AppButton from '../AppButton.vue'

  defineProps({
    showBack: { type: Boolean, default: true },
  });

  const emit = defineEmits(['onNext', 'onBack']);

</script>

<template>
  <div class="button-container">
    <AppButton v-if="showBack"  @click="emit('onBack')" type="text">Go Back</AppButton>
    <AppButton @click="emit('onNext')" type="primary">Next Step</AppButton>
  </div>
</template>

<style lang="scss" scoped>
  .button-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: var(--white);
    padding: 15px 20px;
    *:last-child {
      margin-left: auto;
    }
  }

</style>

