<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="isDisableDecrementControl"
      @click="$emit('onChange', value - 1)"
      data-test="counter-minus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="isDisableIncrementControl"
      @click="$emit('onChange', value + 1)"
      data-test="counter-plus"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AppCounterControl",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: null,
    },
  },
  computed: {
    isDisableIncrementControl() {
      return this.maxValue ? this.value === this.maxValue : false;
    },
    isDisableDecrementControl() {
      return this.value === 0;
    },
  },
};
</script>
