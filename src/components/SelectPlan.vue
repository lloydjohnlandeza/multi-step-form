<script setup lang="ts">
  import AppBox from './AppBox.vue'
  import AppToggle from './AppToggle.vue'
  import { useFormStore, type PlanProperties } from '@/stores/form'
  import { storeToRefs } from 'pinia'
  import { reactive } from 'vue'
  import arcade from '@/assets/icon-arcade.svg'
  import advanced from '@/assets/icon-advanced.svg'
  import pro from '@/assets/icon-pro.svg'

  interface IOption {
    title: string,
    description: {
      monthly: string,
      yearly: string
    },
    amount: {
      monthly: number,
      yearly: number
    },
    src: string,
    subdescription: string
  }
  interface State {
    planOptions: Array<IOption>
  }

  const state = reactive<State>({
    planOptions: [
      {
        title: 'Arcade',
        description: {
          monthly: '$90/yr',
          yearly: '$9/mo'
        },
        amount: {
          monthly: 90,
          yearly: 9
        },
        subdescription: '2 months free',
        src: arcade
      },
      {
        title: 'Advanced',
        description: {
          monthly: '$120/yr',
          yearly: '$12/mo'
        },
        amount: {
          monthly: 120,
          yearly: 12
        },
        subdescription: '2 months free',
        src: advanced
      },
      {
        title: 'Pro',
        description: {
          monthly: '$150/yr',
          yearly: '$15/mo'
        },
        amount: {
          monthly: 150,
          yearly: 15
        },
        subdescription: '2 months free',
        src: pro
      }
    ]
  })

  const store = useFormStore()
  const { form } = storeToRefs(store)
  const { plan } = form.value

  const handleUpdatePlan = (value: IOption, name: PlanProperties) => {
    store.updatePlan(value.title, name)
    store.updatePlan(value.amount, 'amount')

  }
  const selectBilling = (e: Boolean) => {
    const billing = e ? 'yearly' : 'monthly'
    store.updatePlan(billing, 'billing')

  }
</script>

<template>
  {{ plan.billing }}
  <div class="plans">
    <AppBox
      v-for="(item, index) in state.planOptions" :key="index"
      :active="item.title === plan.type"
      @click="handleUpdatePlan(item, 'type')"
    >
      <img :src="item.src" />

      <div>
        <label>{{item.title}}</label>
        <p>{{item.description[plan.billing]}}</p>
        <span :class="plan.billing === 'yearly' && 'visible'">{{item.subdescription}}</span>
      </div>
    </AppBox>
  </div>
  <div class="app-toggle-container">
    <AppToggle
      :value="plan.billing === 'yearly'"
      @change="selectBilling"
      label-off="Monthly"
      label-on="Yearly"
    />
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


