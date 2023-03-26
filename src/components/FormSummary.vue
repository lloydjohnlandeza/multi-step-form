<script setup lang="ts">
  import { useFormStore } from '@/stores/form'
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';

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
  const emit = defineEmits(['changePlan']);
</script>

<template>
  <div class="container background">
    <h5 class="txt-medium">{{ form.plan.type }} (<span class="txt-medium txt-capitalize">{{form.plan.billing}}</span>)</h5>
    <ul>
      <li class="divider">
        <span class="clickable" @click="emit('changePlan')">
          Change
        </span>
        <span class="txt-marine-blue txt-bold">
          {{form.plan.amount[billing]}}{{ unit }}
        </span>
      </li>
      <li
        v-for="(item, index) in form.addOns" :key="index"
      >
        <span>
          {{ item.label }}
        </span>
        <span class="txt-marine-blue txt-medium">
          +${{ item.amount[billing] }}{{ unit }}
        </span>
      </li>
    </ul>
  </div>
  <ul class="container">
    <li class="title">
      <span>Total (per {{ unit === '/mo' ? 'month' : 'year' }})</span>
      <span class="txt-purplish-blue txt-bold">${{ total }}{{ unit }}</span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .txt-capitalize {
    text-transform: capitalize;
  }
  .background {
    background-color: var(--magnolia);

  }
  .container {
    padding: 15px;
    border-radius: 5px;
  }
  .title {
    font-size: var(--h3);
  }
  ul {
    li {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      padding: 5px 0;
      &.divider {
        padding: 0 0 20px;
        margin-bottom: 10px;
        border-bottom: solid 1px var(--light-gray);
        span {
          &:first-child {
            text-decoration: underline;
          }
        }
      }
    }
  }
  @media (max-width: 767px) {
    ul {
      li {
        padding: 2px 0;
        &.divider {
          padding: 0 0 10px;
        }
      }
    }
  }
</style>


