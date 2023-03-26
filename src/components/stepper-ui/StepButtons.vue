<script setup lang="ts">
  import { computed } from 'vue';
  import AppButton from '../AppButton.vue'

  const props = defineProps({
    showBack: { type: Boolean, default: true },
    lastStep: { type: Boolean, default: false }
  });

  const emit = defineEmits(['onNext', 'onBack']);
  const nextLabel = computed(() => {
    return props.lastStep ? 'Confirm' : 'Next Step'
  })
</script>

<template>
  <div class="button-container">
    <AppButton v-if="showBack"  @click="emit('onBack')" type="text">Go Back</AppButton>
    <AppButton @click="emit('onNext')" :type="!props.lastStep ? 'primary' : 'secondary'">
      {{ nextLabel }}
    </AppButton>
  </div>
</template>

<style lang="scss" scoped>
  .button-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: var(--white);
    padding: 15px 20px;
    margin-top: auto;
    @media (min-width: 768px) {
      padding: 15px 0;
    }
    *:last-child {
      margin-left: auto;
    }
  }

</style>

