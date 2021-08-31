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
          :isDraggable="checkIsDraggable(ingredient.count)"
        >
          <div :class="getDraggableClass(ingredient.count)">
            <span class="filling" :class="`filling--${ingredient.label}`">{{
              ingredient.name
            }}</span>
            <CounterControl
              :value="ingredient.count"
              :max-value="maxIngredientsCountValue"
              @onChange="setValue"
              :id="ingredient.id"
            />
          </div>
        </AppDrag>
      </li>
    </ul>
  </div>
</template>

<script>
import CounterControl from "@/common/components/CounterControl";
import AppDrag from "@/common/components/Drag'n'Drop/AppDrag";
import { INGREDIENTS_MAX_COUNT } from "@/common/constants";
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
      maxIngredientsCountValue: INGREDIENTS_MAX_COUNT,
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
