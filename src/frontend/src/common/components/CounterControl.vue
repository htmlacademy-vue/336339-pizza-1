<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="isDisableDecrementControl"
      @click="handleDecrement"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="isDisableIncrementControl"
      @click="handleIncrement"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "CounterControl",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: null,
    },
    setValue: {
      type: Function,
      required: true,
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
  methods: {
    handleIncrement() {
      this.setValue(this.value + 1);
    },
    handleDecrement() {
      this.setValue(this.value - 1);
    },
  },
};
</script>
