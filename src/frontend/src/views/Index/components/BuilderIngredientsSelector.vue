<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>
    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <AppDrag
          :transfer-data="ingredient"
          :is-draggable="checkIsDraggable(ingredient.quantity)"
        >
          <div :class="getDraggableClass(ingredient.quantity)">
            <span class="filling" :class="`filling--${ingredient.label}`">{{
              ingredient.name
            }}</span>
            <AppCounterControl
              :value="ingredient.quantity"
              :max-value="maxIngredientsCountValue"
              class="ingredients__counter"
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
@import "~@/assets/scss/mixins/m_clear-list.scss";
@import "~@/assets/scss/mixins/m_center.scss";

.draggable-item {
  &:hover {
    cursor: pointer;
  }
}
.counter--orange {
  background-color: $orange-200;

  &:hover:not(:active):not(:disabled) {
    background-color: $orange-100;
  }

  &:active:not(:disabled) {
    background-color: $orange-300;
  }
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("~@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("~@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("~@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("~@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("~@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("~@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("~@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("~@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("~@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("~@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("~@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("~@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("~@/assets/img/filling/salmon.svg");
  }
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
