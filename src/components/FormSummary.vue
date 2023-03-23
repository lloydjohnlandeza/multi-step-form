<script setup lang="ts">
  import AppInput from './AppInput.vue';
  import { useFormStore, type PersonalInfo } from '@/stores/form'
  import { storeToRefs } from 'pinia';
  import { required, email, helpers } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'
  import { computed } from 'vue';

  const store = useFormStore()
  const { form } = storeToRefs(store)
  const billing = form.value.plan.billing
  const unit = billing === 'yearly' ? '/yr' : '/mo'

  const state = computed(() => {
    return {
      baseAmount: `$${form.value.plan.amount[billing]}${unit}`
    }
  })
</script>

<template>
  {{ form }}
  <div class="background container">
    <h5 class="txt-medium">{{ form.plan.type }} (<span class="txt-medium txt-capitalize">{{form.plan.billing}}</span>)</h5>
    <ul>
      <li class="divider">
        <span>
          Change
        </span>
        <span class="txt-marine-blue txt-bold">
          {{state.baseAmount}}
        </span>
      </li>
      <li
        v-for="(item, index) in form.addOns" :key="index"
      >
        <span>
          {{ item.label }}
        </span>
        <span class="txt-marine-blue txt-medium">
          {{ item.amount[billing] }}
        </span>
      </li>
    </ul>
  </div>
  <ul class="container">
    <li class="title">
      <span>Total (per year)</span>
      <span class="txt-purplish-blue txt-bold">$120/yr</span>
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
      &.divider {

        padding: 5px 0;
        margin-bottom: 5px;
        border-bottom: solid 1px var(--light-gray);
        span {
          &:first-child {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>


