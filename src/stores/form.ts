import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export type PersonalInfo = 'name' | 'email' | 'number'
export type PlanProperties = 'type' | 'billing' | 'amount'
export type Billing = 'monthly' | 'yearly'

export interface IPersonalInfo {
  name: string
  email: string
  number: string
}

export interface IAmount {
  monthly: number
  yearly: number
}

export interface IPlan {
  type: string
  amount: IAmount
  billing: Billing
}

export interface IAddon {
  addon: string
  label: string
  amount: IAmount
}
export interface Form {
  personalInfo: IPersonalInfo
  plan: IPlan
  addOns: Array<IAddon>
}

type UpdatePlanValue<T> = T extends 'billing' ? Billing : T extends 'amount' ? IAmount : string

const initialState = {
  personalInfo: {
    name: '',
    email: '',
    number: ''
  },
  plan: {
    type: 'Arcade',
    amount: {
      yearly: 90,
      monthly: 9
    },
    billing: 'monthly'
  },
  addOns: []
}

const shallowCopyOfInitialState = (s) => JSON.parse(JSON.stringify(s))

export const useFormStore = defineStore('form', () => {
  let form = reactive<Form>(shallowCopyOfInitialState(initialState))

  const updatePersonalInfo = (value: string, name: PersonalInfo) => {
    form.personalInfo[name] = value
  }

  const updatePlan = <T extends PlanProperties>(value: UpdatePlanValue<T>, name: T) => {
    form.plan[name] = value
  }

  const updateAddOns = (value: IAddon) => {
    const index = form.addOns.findIndex((i) => i.addon === value.addon)
    if (index !== -1) {
      form.addOns.splice(index, 1)
    } else {
      form.addOns.push(value)
    }
  }

  const unit = computed(() => {
    return form.plan.billing === 'yearly' ? '/yr' : '/mo'
  })

  const resetToInitial = () => {
    Object.assign(form, shallowCopyOfInitialState(initialState));
  }

  return { form, updatePersonalInfo, updatePlan, updateAddOns, resetToInitial, unit }
})
