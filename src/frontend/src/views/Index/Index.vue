<template>
  <div class="content">
    <form
      action="#"
      method="post"
    >
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
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>
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
              :value="pizza.name"
              @input="handleChangeName"
            />
          </label>
          <AppDrop @drop="onDropIngredientHandler($event)">
            <transition
              name="view"
              appear
              enter-active-class="animate__animated animate__pulse"
              mode="out-in"
            >
              <BuilderPizzaView
                :ingredients="nonEmptyIngredients"
                :sauce="sauces[pizza.sauceId]"
                :dough="dough[pizza.doughId]"
                :key="nonEmptyIngredientsLength"
              />
            </transition>
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
    <router-view />
  </div>
</template>

<script>
import { TRANSITION_ENTER_ACTIVE_CLASS } from "@/common/constants";
import {
  BuilderDoughSelector,
  BuilderIngredientsSelector,
  BuilderPizzaView,
  BuilderSauceSelector,
  BuilderSizeSelector,
} from "./components";
import { AppDrop } from "@/common/components";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Main",

  layout: "AppLayoutWithHeader",

  enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,

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
    nonEmptyIngredientsLength() {
      return Object.keys(this.nonEmptyIngredients).reduce(
        (accumulator, key) => {
          return accumulator + this.nonEmptyIngredients[key].quantity;
        },
        0
      );
    },
    isDisabledButton() {
      return (
        this.pizza.name === "" ||
        Object.keys(this.nonEmptyIngredients).length === 0
      );
    },
  },

  beforeDestroy() {
    this.resetBuilder();
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
      this.putIngredient({ id: ingredient.id, value: ingredient.quantity + 1 });
    },
    async addPizza() {
      await this.post();
      this.resetBuilder();
    },
  },
};
</script>
