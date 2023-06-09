<script setup lang="ts">
  import { useSlots, computed, ref } from 'vue'
  import StepperNav from './stepper-ui/StepperNav.vue'
  import StepContent from './stepper-ui/StepContent.vue'
  import StepButtons from './stepper-ui/StepButtons.vue'

  const props = defineProps({
    step: { type: Number, required: true },
    title: { type: String, required: false },
    stepsTitle: { type: Array, required: false },
    description: { type: String, required: false },
    showButtons: { type: Boolean, default: true },
  });

  const slots = useSlots()
  const slotCount = (slots.default && slots.default().length) ?? 0

  const emit = defineEmits(['onNext', 'onBack']);
  const leave = ref('')
  const enter = ref('')

  const activeSlot = computed(() => {
    if (slots.default) {
      return slots.default()[props.step]
    }
    return { key: null }
  })
  const onNext = () => {
    emit('onNext')
    leave.value = '10px'
    enter.value = '10px'
  }
  const onBack = () => {
    emit('onBack')
    leave.value = '-10px'
    enter.value = '-10px'
  }


</script>

<template>
  <div
    :style="{'--leave': `${leave}`, '--enter': `${enter}` }"
    class="stepper-container"
  >
  <StepperNav
    :step="step"
    :count="slotCount"
    :stepsTitle="stepsTitle"
  />
  <transition name="fade" mode="out-in" >
    <div
      :key="activeSlot.key ? activeSlot.key : 'default-key'"
    >
      <StepContent
        :title="title"
        :description="description"
      >
        <component :is="() => activeSlot" :key="step" />
      </StepContent>
    </div>
  </transition>
  <StepButtons v-if="showButtons" :lastStep="slotCount === (step + 1)" :showBack="step !== 0" @onNext="onNext"  @onBack="onBack"/>
  </div>
</template>

<style lang="scss" scoped>
  .stepper-container {
    display: flex;
    overflow-x: hidden;
    .fade-enter-active,
    .fade-leave-active {
      transition: all var(--transition-duration) ease;
    }
    .fade-leave-active {
      transform: translateX(var(--leave));
      opacity: 0;
    }
    .fade-enter-active {
      transform: translate(0px);
      opacity: 1;
    }
    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }

    .fade-enter-from {
      transform: translateX(var(--enter));
      opacity: 0;
    }
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 265px 1fr;
      flex-direction: column;
      background-color: var(--white);
      border-radius: 20px;
      padding: 20px;
      margin: 15px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      gap: 15px 50px;
      width: 100%;
      margin: auto;
      height: 100%;
      max-width: 940px;
      max-height: 600px;
      > div {
        &:nth-child(1) {
          grid-row: 1/3;
          padding: 20px;
          max-width: 265px;
          width: 100%;
          border-radius: 5px;
        }
      }
    }
    @media (max-width: 767px) {
      height: 100vh;
      flex-direction: column;
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

