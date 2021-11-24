<template>
  <label class="input">
    <span
      v-if="label"
      class="label"
    >{{ label }}</span>
    <input
      ref="input"
      :value="value"
      :type="type"
      :name="name"
      class="text-field__input"
      :class="{ 'text-field__input--error': showError }"
      :placeholder="placeholder"
      :required="required"
      @input="$emit('input', $event.target.value)"
    />
    <span
      v-if="showError"
      class="text-field__text error error_text"
    >
      {{ errorText }}
    </span>
  </label>
</template>

<script>
export default {
  name: "AppInput",

  model: {
    prop: "value",
    event: "input",
  },

  props: {
    value: {
      type: [String, Number],
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "text",
    },

    placeholder: {
      type: String,
      default: "",
    },

    label: {
      type: String,
      default: "",
    },

    errorText: {
      type: String,
      default: "",
    },

    required: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    showError() {
      return !!this.errorText;
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
}

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }
}
</style>
