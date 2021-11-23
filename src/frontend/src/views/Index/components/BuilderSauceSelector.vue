<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>
    <label
      v-for="sauce in sauces"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.id"
        :checked="sauce.id == valueId"
        @input="$emit('setSauce', $event.target.value)"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "BuilderSauceSelector",

  props: {
    sauces: {
      type: Object,
      required: true,
    },

    valueId: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>
