<script setup lang="ts">
  import CustomInput from './CustomInput.vue';
</script>

<template>
  <form action="#">
    <CustomInput type="text" name="name" placeholder="e.g. Stephen King" label="Name" />
    <CustomInput type="email" name="email" placeholder="e.g. stephenking@lorem.com" label="Email Address" />
    <CustomInput type="text" name="number" placeholder="e.g. +1 234 567 890" label="Phone Number" />

  </form>

</template>

<style lang="scss" scoped>
  .input-container {
    margin-bottom: 15px;
  }
</style>


