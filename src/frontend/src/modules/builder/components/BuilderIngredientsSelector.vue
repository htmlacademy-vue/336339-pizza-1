<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="ingredient in ingredients"
        :key="ingredient.id"
      >
        <span class="filling" :class="`filling--${ingredient.label}`">{{
          ingredient.name
        }}</span>
        <CounterControl
          :value="ingredient.quantity"
          :max-value="maxIngredientsCountValue"
          :set-value="(value) => setValue(ingredient.id, value)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import CounterControl from "@/common/components/CounterControl";
import { INGREDIENTS_MAX_QUANTITY } from "@/common/constants";
export default {
  name: "BuilderIngredientsSelector",
  props: {
    ingredients: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      maxIngredientsCountValue: INGREDIENTS_MAX_QUANTITY,
    };
  },
  components: { CounterControl },
  methods: {
    setValue(id, value) {
      this.$emit("setIngredient", id, value);
    },
  },
};
</script>
