<script setup lang="ts">
  import { ref, computed } from 'vue'
  import AppStepper from '@/components/AppStepper.vue'
  import PersonalInfo from '@/components/PersonalInfo.vue'
  import SelectPlan from '@/components/SelectPlan.vue'
  import AddOns from '@/components/AddOns.vue';
  import FormSummary from '@/components/FormSummary.vue';
  import ConfirmMessage from '@/components/ConfirmMessage.vue';
  import { useFormStore } from '@/stores/form'


  const store = useFormStore()

  const stepsTitle = ref(['Your Info', 'Select Plan', 'Add-ons', 'Summary'])
  const step = ref(0)
  const confirmed = ref(false)
  const personalInfo = ref<InstanceType<typeof PersonalInfo>>()

  // flag to avoid going next/previous page too fast
  const isAnimating = ref(false)

  const stepValidation = async () => {
    switch (step.value) {
      case 0:
        return personalInfo.value && personalInfo.value.formSubmit()
      default:
        return true;
    }

  }
  const handleNext = async () => {
    if (isAnimating.value) return
    animationTriggered()

    const valid = await stepValidation()
    if (step.value === 3) {
      confirmed.value = true
    }

    if (valid && step.value < 3) {
      step.value++
    }


  }
  const handleBack = () => {
    if (isAnimating.value) return
    animationTriggered()

    if (step.value > 0) step.value--
  }
  const animationTriggered = () => {
    isAnimating.value = true
    setTimeout(() => {
      isAnimating.value = false
    }, 600);
  }

  const handleChangePlan = () => {
    step.value = 0
    store.resetToInitial()
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

  const personalInfoSubmit = async (e: boolean) => {
    if (e) step.value = 1
  }

</script>

<template>
  <main>
    <AppStepper
      :title="heading.title"
      :description="heading.description"
      :stepsTitle="stepsTitle"
      :step="step"
      :showButtons="!confirmed"
      @onNext="handleNext"
      @onBack="handleBack"
    >
      <PersonalInfo
        key="1"
        ref="personalInfo"
        @formSubmit="personalInfoSubmit"
      />
      <SelectPlan
        key="2"
      />
      <AddOns
        key="3"
      />
      <FormSummary
        key="4"
        @changePlan="handleChangePlan"
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
    height: 100%;
    padding: 15px;
  }
</style>
