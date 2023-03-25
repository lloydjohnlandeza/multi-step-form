<script setup lang="ts">
  import { computed } from 'vue';

  function isArray<T>(value: T | Array<T>): value is Array<T> {
    return Array.isArray(value);
  }

  const props = defineProps({
    label: { type: String, required: true },
    description: { type: String, required: false },
    sub: { type: String, required: false },
    val: { type: [String, Number], required: true },
    value: { type: [String, Number, Array], required: true },
  });

  const isChecked = computed(() => {
    if (isArray(props.value)) {
      return props.value.includes(props.val)
    }
    return props.value === props.val
  })

  const emit = defineEmits<{
    (event: 'change', value: undefined | string | number | Array<unknown>): void;
  }>();

  const handleChange = () => {
    if (isArray(props.value)) {
      if (isChecked.value) {
        return emit('change', props.value.filter(i => i !== props.val))
      } else {
        const newValue = [...props.value]
        newValue.push(props.val)
        return emit('change', newValue)
      }
    }
    if (!isChecked.value) {
      return emit('change', props.val)
    }

    return emit('change', undefined)
  }

</script>

<template>
  <div @click="handleChange" class="app-checkbox">
    <input tab="0" type='checkbox' :checked="isChecked" />
    <label>
      <span></span>
      <div class="text">
        <div>
          <span>{{ label }}</span>
          <span v-if="description">{{ description }}</span>
        </div>
        <span v-if="sub">{{ sub }}</span>
      </div>

    </label>
  </div>
</template>

<style lang="scss" scoped>
.app-checkbox {
  display: flex;
  flex-direction: column;
  padding: 0;
  font-size: 24px;
  line-height: 1;
  width: 100%;
}

input[type='checkbox']{ height: 0; width: 0; }

input[type='checkbox'] + label{
  display: flex;
  position: relative;
  margin: 0;
  align-items: center;
  color: var(--marine-blue);
  transition: color 250ms cubic-bezier(.4,.0,.23,1);
  .text {
    display: flex;
    justify-content: space-between;

    flex: 1;
    gap: 8px;
    cursor: pointer;
    user-select: none;
    > span {
      font-size: var(--h6);
      color: var(--cool-gray);
    }
    > div > span {
      display: flex;
      flex-direction: column;
      &:nth-child(1) {
        font-size: var(--h4);
        font-weight: 700;
        padding-bottom: 8px;
      }
      &:nth-child(2) {
        font-size: var(--h6);
        color: var(--cool-gray);
      }
    }
  }
}
input[type='checkbox'] + label > span{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
  min-width: 1em;
  height: 1em;
  background: transparent;
  border: 2px solid var(--marine-blue);
  border-radius: 2px;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
}

input[type='checkbox'] + label:hover > span, input[type='checkbox']:focus + label > span{
  position: static;
  background-color: var(--magnolia);
}

input[type='checkbox']:checked + label > span{
  position: relative;
  border: .5em solid var(--marine-blue);
  animation: shrink-bounce 200ms cubic-bezier(.4,.0,.23,1);
}
input[type='checkbox']:checked + label > span:before{
  content: "";
  position: absolute;
  top: -0.1em;
  left: -0.3em;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  transform: rotate(45deg);
  transform-origin: 0% 100%;
  animation: checkbox-check 125ms 250ms cubic-bezier(.4,.0,.23,1) forwards;
  width: 0;
  height: 0;
  border-color: var(--white);
}

@keyframes shrink-bounce{
  0%{
    transform: scale(1);
  }
  33%{
    transform: scale(.85);
  }
  100%{
    transform: scale(1);
  }
}
@keyframes checkbox-check{
  0%{
    width: 0;
    height: 0;
    border-color: var(--white);
    transform: translate3d(0,0,0) rotate(45deg);
  }
  33%{
    width: 0.3em;
    height: 0;
    transform: translate3d(0,0,0) rotate(45deg);
  }
  100%{
    width: 0.3em;
    height: .5em;
    border-color: var(--white);
    transform: translate3d(0,-.4em,0) rotate(45deg);
  }
}
</style>


