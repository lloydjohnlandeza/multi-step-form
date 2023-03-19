<script setup lang="ts">
  import CustomButton from '../CustomButton.vue'
</script>

<template>
  <div class="button-container">
    <CustomButton type="text">Go Back</CustomButton>
    <CustomButton type="primary">Next Step</CustomButton>
  </div>
</template>

<style lang="scss" scoped>
  .button-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: var(--white);
    padding: 15px 20px;
  }

</style>

