<script setup lang="ts">
  import { useSlots, computed } from 'vue'
  import StepperNav from './stepper-ui/StepperNav.vue'
  import StepContent from './stepper-ui/StepContent.vue'
  import StepButtons from './stepper-ui/StepButtons.vue'

  const props = defineProps({
    step: { type: Number, required: true },
  });

  const slots = useSlots()
  const slotCount = (slots.default && slots.default().length) ?? 0

  const emit = defineEmits(['onNext', 'onBack']);

  const activeSlot = computed(() => {
    if (slots.default) {
      return slots.default()[props.step]
    }
    return null
  })
</script>

<template>
  <div class="stepper-container">
    <StepperNav
      :step="step"
      :count="slotCount"
    />
    <StepContent
      title="Personal Info"
      description="Please provide your name, email, address, and phone number."
    >
      <component :is="() => activeSlot"/>
    </StepContent>
    <StepButtons :showBack="step !== 0" @onNext="emit('onNext')"  @onBack="emit('onBack')"/>
  </div>
</template>

<style lang="scss" scoped>
  .stepper-container {
    position: relative;
    @media (max-width: 767px) {
      height: 100vh;
      > div {
        &:nth-child(2) {
          position: absolute;
          top: 90px;
          left: 0;
          right: 0;

        }
        &:nth-child(3) {
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
</style>

