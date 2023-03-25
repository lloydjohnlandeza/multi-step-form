<script setup lang="ts">

  defineProps({
    count: { type: Number, required: true },
    step: { type: Number, required: true },
  });
</script>

<template>
  <div class="stepper-nav">
    <ul>
      <li
        v-for="(index) in count" :key="index"
      >
        <div :class="{ active: step == (index - 1)}">
          {{ index }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .stepper-nav {
    display: flex;
    background: url('../../assets/bg-sidebar-mobile.svg') no-repeat center center/cover;
    height: 100%;
  }
  ul {
    display: flex;
    gap: 15px;
    color: var(--white);
    li {
      > div {
        transition-duration: var(--transition-duration);
        border-radius: 100%;
        border: solid 1px var(--light-blue);
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        &:hover, &.active {
          font-weight: 700;
          background-color: var(--light-blue);
          color: var(--marine-blue);
        }
      }
    }
  }
  @media (max-width: 767px) {
    .stepper-nav {
      height: 25vh;
      background: url('../../assets/bg-sidebar-mobile.svg') no-repeat center center/cover;
    }
    ul {
      margin: 30px auto;
    }
  }

</style>

