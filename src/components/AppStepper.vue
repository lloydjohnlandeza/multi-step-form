<script setup lang="ts">
  import { useSlots, computed, ref } from 'vue'
  import StepperNav from './stepper-ui/StepperNav.vue'
  import StepContent from './stepper-ui/StepContent.vue'
  import StepButtons from './stepper-ui/StepButtons.vue'

  const props = defineProps({
    step: { type: Number, required: true },
    title: { type: String, required: false },
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
      transition: all 0.5s ease;
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

