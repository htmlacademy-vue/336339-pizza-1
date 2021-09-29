<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="ingredient in ingredients"
        :key="ingredient.id"
      >
        <AppDrag
          :transferData="ingredient"
          :isDraggable="checkIsDraggable(ingredient.quantity)"
        >
          <div :class="getDraggableClass(ingredient.quantity)">
            <span class="filling" :class="`filling--${ingredient.label}`">{{
              ingredient.name
            }}</span>
            <CounterControl
              :value="ingredient.quantity"
              :max-value="maxIngredientsCountValue"
              @onChange="setValue"
              :id="ingredient.id"
              class="ingredients__counter counter--orange"
            />
          </div>
        </AppDrag>
      </li>
    </ul>
  </div>
</template>

<script>
import { CounterControl, AppDrag } from "@/common/components";
import { INGREDIENTS_MAX_QUANTITY } from "@/common/constants";
export default {
  name: "BuilderIngredientsSelector",
  components: { CounterControl, AppDrag },
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
<style lang="scss">
.draggable-item {
  &:hover {
    cursor: pointer;
  }
}
</style>
