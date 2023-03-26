<script setup lang="ts">
  import IconThankYou from '../assets/icon-thank-you.svg'
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
        max-width: 60px;
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


