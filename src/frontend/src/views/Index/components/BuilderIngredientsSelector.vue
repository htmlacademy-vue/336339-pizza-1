<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        :key="ingredient.id"
        class="ingredients__item"
        v-for="ingredient in ingredients"
      >
        <AppDrag
          :transfer-data="ingredient"
          :is-draggable="checkIsDraggable(ingredient.quantity)"
        >
          <div :class="getDraggableClass(ingredient.quantity)">
            <span
              class="filling"
              :class="`filling--${ingredient.label}`"
            >{{
              ingredient.name
            }}</span>
            <AppCounterControl
              :value="ingredient.quantity"
              :max-value="maxIngredientsCountValue"
              class="ingredients__counter counter--orange"
              @onChange="(value) => setValue(ingredient.id, value)"
            />
          </div>
        </AppDrag>
      </li>
    </ul>
  </div>
</template>

<script>
import { AppCounterControl, AppDrag } from "@/common/components";
import { INGREDIENTS_MAX_QUANTITY } from "@/common/constants";
export default {
  name: "BuilderIngredientsSelector",

  components: { AppCounterControl, AppDrag },

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

  methods: {
    setValue(id, value) {
      this.$emit("setIngredient", { id, value });
    },
    checkIsDraggable(value) {
      return value < 3;
    },
    getDraggableClass(value) {
      return {
        "draggable-item": this.checkIsDraggable(value),
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.draggable-item {
  &:hover {
    cursor: pointer;
  }
}
</style>
