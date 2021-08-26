<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <BuilderDoughSelector
        :dough="dough"
        :value-id="pizzaOrder.dough"
        @setDough="handleChangeDough"
      />
      <!--
      <div class="content__diameter">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите размер</h2>
          <div class="sheet__content diameter">
            <label
              class="diameter__input"
              :class="`diameter__input--${size.value}`"
              v-for="size in sizes"
              :key="size.id"
            >
              <input
                type="radio"
                name="diameter"
                :value="size.value"
                class="visually-hidden"
                :checked="size.isChecked"
              />
              <span>{{ size.name }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="content__ingredients">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

          <div class="sheet__content ingredients">
            <div class="ingredients__sauce">
              <p>Основной соус:</p>
              <label
                class="radio ingredients__input"
                v-for="sauce in sauces"
                :key="sauce.id"
              >
                <input
                  type="radio"
                  name="sauce"
                  :value="sauce.value"
                  :checked="sauce.isChecked"
                />
                <span>{{ sauce.name }}</span>
              </label>
            </div>

            <div class="ingredients__filling">
              <p>Начинка:</p>
              <ul class="ingredients__list">
                <li
                  class="ingredients__item"
                  v-for="ingredient in ingredients"
                  :key="ingredient.id"
                >
                  <span
                    class="filling"
                    :class="`filling--${ingredient.label}`"
                    >{{ ingredient.name }}</span
                  >
                  <CounterControl
                    :value="0"
                    :max-value="maxIngredientsCountValue"
                    :set-value="setCounter"
                  />
                </li>
              </ul>
            </div>
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
          />
        </label>

        <div class="content__constructor">
          <div class="pizza pizza--foundation--big-tomato">
            <div class="pizza__wrapper">
              <div class="pizza__filling pizza__filling--ananas"></div>
              <div class="pizza__filling pizza__filling--bacon"></div>
            </div>
          </div>
        </div>
        <div class="content__result">
          <p>{{ `Итого: ${pizzaOrder.total} ₽` }}</p>
          <button type="button" class="button" disabled>Готовьте!</button>
        </div>
      -->
    </div>
    <p>{{ `Итого: ${total} ₽` }}</p>
  </form>
</template>

<script>
import pizza from "@/static/pizza.json";
import {
  INGREDIENTS_MAX_QUANTITY,
  DEFAULT_PIZZA_ORDER,
} from "@/common/constants";
import {
  doughToClientAdapter,
  // sizeToClientAdapter,
  // sauceToClientAdapter,
  // ingredientToClientAdapter,
} from "@/common/adapters";
import { BuilderDoughSelector } from "./components";
import { calculateCostOfPizza } from "@/common/utils";

export default {
  name: "Builder",
  components: { BuilderDoughSelector },
  data() {
    // const adaptedSizes = pizza.sizes.map((item) => sizeToClientAdapter(item));
    // const adaptedSauces = pizza.sauces.map((item) =>
    //   sauceToClientAdapter(item)
    // );

    return {
      pizza,
      dough: doughToClientAdapter(pizza.dough),
      // sizes: adaptedSizes,
      // sauces: adaptedSauces,
      // ingredients: pizza.ingredients.map((item) =>
      //   ingredientToClientAdapter(item)
      // ),
      maxIngredientsCountValue: INGREDIENTS_MAX_QUANTITY,
      pizzaOrder: { ...DEFAULT_PIZZA_ORDER },
    };
  },

  computed: {
    total() {
      return calculateCostOfPizza(this.dough[this.pizzaOrder.dough]);
    },
  },
  methods: {
    setCounter(value) {
      console.log("setCounter", value);
    },
    handleChangeDough(doughId) {
      this.pizzaOrder = { ...this.pizzaOrder, dough: doughId };
    },
  },
};
</script>
