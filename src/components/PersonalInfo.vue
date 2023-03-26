<script setup lang="ts">
  import AppInput from './AppInput.vue';
  import { useFormStore, type PersonalInfo } from '@/stores/form'
  import { storeToRefs } from 'pinia';
  import { required, email, helpers } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'

  const store = useFormStore()
  const { form } = storeToRefs(store)
  const { personalInfo } = form.value

  const formValidation = {
    name: {
      required: helpers.withMessage('This field is required', required)

    },
    email: {
      required: helpers.withMessage('This field is required', required),
      email: helpers.withMessage('This field is not a valid email', email),
    },
    number: {
      required: helpers.withMessage('This field is required', required)

    }
  }

  const handleInput = (value: string, name: PersonalInfo) => {
    store.updatePersonalInfo(value, name)
  }
  const handleBlur = (field: PersonalInfo) => {
    vuelidate.value[field].$touch()
  }
  const vuelidate = useVuelidate(formValidation, personalInfo)

  const emit = defineEmits<{
    (event: 'formSubmit', value: boolean): Promise<boolean>;
  }>();

  const formSubmit = async <T extends InputEvent = InputEvent>(e?: T): Promise<boolean> => {
    const result = await vuelidate.value.$validate()

    if (e !== undefined) {
      e.stopPropagation()
      emit('formSubmit', result)
    }

    return result
  }

  defineExpose({ formSubmit })
</script>

<template>
  <AppInput :errors="vuelidate.name.$errors" :value="personalInfo.name" @blur="handleBlur('name')" @input="handleInput($event.target.value, 'name')" type="text" name="name" placeholder="e.g. Stephen King" label="Name" />
  <AppInput :errors="vuelidate.email.$errors" :value="personalInfo.email" @blur="handleBlur('email')" @input="handleInput($event.target.value, 'email')" type="email" name="email" placeholder="e.g. stephenking@lorem.com" label="Email Address" />
  <AppInput :errors="vuelidate.number.$errors" :value="personalInfo.number" @keyup.enter.prevent="formSubmit" @blur="handleBlur('number')" @input="handleInput($event.target.value, 'number')" type="text" name="number" placeholder="e.g. +1 234 567 890" label="Phone Number" />
</template>

<style lang="scss" scoped>
  .input-container {
    margin-bottom: 15px;
  }
</style>


