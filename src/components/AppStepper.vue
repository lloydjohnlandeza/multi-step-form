<script setup lang="ts">
  import StepperNav from './stepper-ui/StepperNav.vue'
  import Step from './stepper-ui/StepContent.vue'
  import StepButtons from './stepper-ui/StepButtons.vue'

</script>

<template>
  <div class="stepper-container">
    <StepperNav />
    <Step
      title="Personal Info"
      description="Please provide your name, email, address, and phone number."
    />
    <StepButtons />
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

