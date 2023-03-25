<script setup lang="ts">
  import { ref, computed } from 'vue'
  import AppStepper from '@/components/AppStepper.vue'
  import PersonalInfo from '@/components/PersonalInfo.vue'
  import SelectPlan from '@/components/SelectPlan.vue'
  import AddOns from '@/components/AddOns.vue';
  import FormSummary from '@/components/FormSummary.vue';
  import ConfirmMessage from '@/components/ConfirmMessage.vue';

  const step = ref(0)
  const confirmed = ref(false)
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
    if (step.value === 3) {
      confirmed.value = true
    }

    if (valid && step.value < 3) {
      step.value++
    }
  }

  const heading = computed(() => {
    if (confirmed.value) {
      return {}
    }
    switch (step.value) {
      case 0:
        return {
          title: 'Personal Info',
          description: 'Please provide your name, email, address, and phone number.'
        }
      case 1:
        return {
          title: 'Select your plan',
          description: 'You have the option of monthly or yearly billing.'
        }
      case 2:
        return {
          title: 'Pick add-ons',
          description: 'Add-ons help enhance your gaming experience.'
        }
      case 3:
        return {
          title: 'Finishing up',
          description: 'Double-check everything looks OK before confirming.'
        }
    }
    return {}
  })

</script>

<template>
  <main>
    <AppStepper
      :title="heading.title"
      :description="heading.description"
      :step="step"
      :showButtons="!confirmed"
      @onNext="handleNext"
      @onBack="step > 0 && step--"
    >
      <PersonalInfo
        key="1"
        ref="personalInfo"
      />
      <SelectPlan
        key="2"
      />
      <AddOns
        key="3"
      />
      <FormSummary
        key="4"
        v-if="!confirmed"
      />
      <ConfirmMessage key="5" v-else />
    </AppStepper>
  </main>
</template>


<style scoped>
  main {
    max-width: 1440px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
