import { reactive } from 'vue'
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

type UpdatePlanValue<T> = T extends 'billing' ? Billing : string | IAmount

export const useFormStore = defineStore('form', () => {
  const form = reactive<Form>({
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
  })

  const updatePersonalInfo = (value: string, name: PersonalInfo) => {
    form.personalInfo[name] = value
  }

  const updatePlan = <T extends PlanProperties>(value: UpdatePlanValue<T>, name: T) => {
    ;(form.plan[name] as UpdatePlanValue<T>) = value
  }

  const updateAddOns = (value: IAddon) => {
    const index = form.addOns.findIndex((i) => i.addon === value.addon)
    if (index !== -1) {
      form.addOns.splice(index, 1)
    } else {
      form.addOns.push(value)
    }
  }

  return { form, updatePersonalInfo, updatePlan, updateAddOns }
})
