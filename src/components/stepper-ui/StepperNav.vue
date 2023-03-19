<script setup lang="ts">
</script>

<template>
  <div class="stepper-nav">
    <ul>
      <li>
        <div>
          1
        </div>
      </li>
      <li>
        <div>
          2
        </div>
      </li>
      <li>
        <div>
          3
        </div>
      </li>
      <li>
        <div>
          4
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .stepper-nav {
    display: flex;
    background: url('../../assets/bg-sidebar-mobile.svg') no-repeat center center/cover;
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
        &:hover {
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

