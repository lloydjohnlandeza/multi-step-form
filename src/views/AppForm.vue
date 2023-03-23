<script setup lang="ts">
  import { ref } from 'vue'
  import AppStepper from '@/components/AppStepper.vue'
  import PersonalInfo from '@/components/PersonalInfo.vue'
  import SelectPlan from '@/components/SelectPlan.vue'
  import AddOns from '@/components/AddOns.vue';
  import FormSummaryVue from '@/components/FormSummary.vue';

  const step = ref(0)
  const personalInfo = ref<InstanceType<typeof PersonalInfo>>()


  const stepValidation = async () => {
    switch (step.value) {
      case 0:
        return personalInfo.value && personalInfo.value.formSubmit()
      default:
        return true;
    }

  }
  const handleNext = async () => {
    const valid = await stepValidation()
    if (valid && step.value < 3) {
      step.value++
    }
  }
</script>

<template>
  <main>
    <AppStepper
      :step="step"
      @onNext="handleNext"
      @onBack="step > 0 && step--"
    >
      <PersonalInfo
      ref="personalInfo"
      />
      <SelectPlan />
      <AddOns />
      <FormSummaryVue />
  </AppStepper>
  </main>
</template>


<style scoped>
  main {
    max-width: 1440px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
