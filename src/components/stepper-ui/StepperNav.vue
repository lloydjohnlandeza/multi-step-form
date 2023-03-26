<script setup lang="ts">

  defineProps({
    count: { type: Number, required: true },
    step: { type: Number, required: true },
    stepsTitle: { type: Array, default: () => [] }
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
        <div class="description">
          <span>STEP {{ index }}</span>
          <span>{{ stepsTitle[index-1] }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .stepper-nav {
    display: flex;
    background: url('../../assets/bg-sidebar-desktop.svg') no-repeat center center/cover;
  }
  ul {
    display: flex;
    gap: 15px;
    color: var(--white);
    li {
      .description {
        display: none;
        }
      > div {
        &:first-child {
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
  }
  @media (min-width: 768px) {
    .stepper-nav {
      flex: 1;
    }
    ul {
      width: 100%;
      flex-direction: column;
      li {
        display: flex;
        align-items: center;
        gap: 20px;
        width: 100%;
        .description {
          display: flex;
          flex-direction: column;
          span {
            font-size: 14px;
            font-weight: 500;
            color: var(--white);
            text-transform: uppercase;
            &:first-child {
              font-size: 12px;
              color: var(--pastel-blue);
            }
          }
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

