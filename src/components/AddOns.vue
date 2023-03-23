<script setup lang="ts">
  import { reactive, computed } from 'vue'
  import AppBox from './AppBox.vue'
  import AppCheckbox from './AppCheckbox.vue';
  import { useFormStore, type IAmount } from '@/stores/form'
  import { storeToRefs } from 'pinia';

  interface State {
    addOnOptions: Array<{
      label: string,
      value: string,
      description: string,
      amount: IAmount
    }>
  }

  const store = useFormStore()
  const { form } = storeToRefs(store)
  const { addOns } = form.value

  const state = reactive<State>({
    addOnOptions: [
      {
        label: 'Online service',
        value: 'online_service',
        description: 'Access to multiplayer games',
        amount: {
          yearly: 10,
          monthly: 1
        }
      },
      {
        label: 'Larger storage',
        value: 'larger_storage',
        description: 'Extra 1TN of cloud save',
        amount: {
          yearly: 20,
          monthly: 2
        }
      },
      {
        label: 'Customizable profile',
        value: 'customizable_profile',
        description: 'Custom theme on your profile',
        amount: {
          yearly: 20,
          monthly: 2
        }
      }
    ]})

  const selected = computed(() => {
    return addOns.map((i) => i.addon)
  })
</script>

<template>
  <div class="plans">
    <AppBox
      v-for="(item, index) in state.addOnOptions" :key="index"
      @click="store.updateAddOns({ addon: item.value, label: item.label, amount: item.amount})"
    >
      <AppCheckbox
        :label="item.label"
        :description="item.description"
        :val="item.value"
        :value="selected"
      />
    </AppBox>
  </div>
</template>

<style lang="scss" scoped>
  .app-toggle-container {
    padding: 20px;
    background-color: var(--magnolia);
    margin-top: 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .plans {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > .app-card {
      display: flex;
      gap: 15px;
      p {
        font-size: 14px;
      }
      span {
        font-size: 12px;
        font-weight: 500;
        color: var(--color-heading);
        max-height: 0;
        transition: var(--transition-generic);
        display: block;
        overflow: hidden;
        &.visible {
          max-height: 20px;
        }
      }
    }
  }
</style>


