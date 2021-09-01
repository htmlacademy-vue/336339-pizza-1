<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <BuilderDoughSelector
        :dough="dough"
        :value-id="pizza.doughId"
        @setDough="putDough"
      />
      <BuilderSizeSelector
        :sizes="sizes"
        :value-id="pizza.sizeId"
        @setSize="putSize"
      />
      <div class="content__ingredients">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
          <div class="sheet__content ingredients">
            <BuilderSauceSelector
              :sauces="sauces"
              :value-id="pizza.sauceId"
              @setSauce="putSauce"
            />
            <BuilderIngredientsSelector
              :ingredients="ingredientsWithCount"
              @setIngredient="putIngredient"
            />
          </div>
        </div>
      </div>
      <div class="content__pizza">
        <label class="input">
          <span class="visually-hidden">Название пиццы</span>
          <input
            type="text"
            name="pizza_name"
            placeholder="Введите название пиццы"
            @input="handleChangeName"
            :value="pizza.name"
          />
        </label>
        <AppDrop @drop="onDropIngredientHandler($event)">
          <BuilderPizzaView
            :ingredients="nonEmptyIngredients"
            :sauce="sauces[pizza.sauceId]"
            :dough="dough[pizza.doughId]"
          />
        </AppDrop>
        <div class="content__result">
          <p>{{ `Итого: ${pizzaPrice} ₽` }}</p>
          <button
            type="button"
            class="button"
            :disabled="isDisabledButton"
            @click="addPizza"
          >
            Готовьте!
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import AppDrop from "@/common/components/Drag'n'Drop/AppDrop";
import {
  BuilderDoughSelector,
  BuilderSizeSelector,
  BuilderSauceSelector,
  BuilderIngredientsSelector,
  BuilderPizzaView,
} from "./components";

export default {
  name: "Builder",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderSauceSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    AppDrop,
  },
  computed: {
    ...mapState("Builder", ["pizza", "dough", "sauces", "sizes"]),
    ...mapGetters("Builder", ["pizzaPrice", "ingredientsWithCount"]),
    nonEmptyIngredients() {
      return Object.keys(this.pizza.ingredients).reduce((accumulator, key) => {
        if (this.pizza.ingredients[key] > 0) {
          accumulator[key] = { ...this.ingredientsWithCount[key] };
        }
        return accumulator;
      }, {});
    },
    isDisabledButton() {
      return this.pizza.name === "" || this.nonEmptyIngredients.length === 0;
    },
  },
  methods: {
    ...mapActions("Builder", [
      "putDough",
      "putSize",
      "putSauce",
      "putName",
      "putIngredient",
      "post",
      "resetBuilder",
    ]),
    handleChangeName(event) {
      this.putName(event.target.value);
    },
    onDropIngredientHandler(ingredient) {
      this.putIngredient({ id: ingredient.id, value: ingredient.count + 1 });
    },
    async addPizza() {
      await this.post();
      await this.$router.push("Cart");
    },
  },
  beforeDestroy() {
    this.resetBuilder();
  },
};
</script>
