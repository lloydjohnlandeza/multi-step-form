<script setup lang="ts">
  import { useFormStore } from '@/stores/form'
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import IconThankYou from '../assets/icon-thank-you.svg'

  const store = useFormStore()
  const { form } = storeToRefs(store)
  const billing = form.value.plan.billing
  const unit = billing === 'yearly' ? '/yr' : '/mo'

  const total = computed(() => {
    let computeTotal = 0
    for (let index = 0; index < form.value.addOns.length; index++) {
      const { amount } = form.value.addOns[index];
      computeTotal += amount[billing]
    }
    computeTotal += form.value.plan.amount[billing]
    return computeTotal
  })
</script>

<template>
  <div class="container">
    <img :src="IconThankYou" />
    <h2>
      Thank you!
    </h2>
    <p>
      Thanks for confirming your subscription! We hope you have fun using our platform.
      If you ever need support, please feel free to email us at support@loremgaming.com
    </p>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 55px 0;
    img {
        max-width: 70px;
    }
    h2 {
      margin: 20px 0 10px;
      font-size: 24px;
    }
    p {
      text-align: center;
    }
    max-width: 100%;
    @media (max-width: 767px) {
      p {
        max-width: 300px;
      }
    }
  }
</style>


