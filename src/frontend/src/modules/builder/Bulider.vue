<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <BuilderDoughSelector
        :dough="pizzaData.dough"
        :value-id="pizzaOrder.dough.id"
        @setDough="handleChangeDough"
      />
      <BuilderSizeSelector
        :sizes="pizzaData.sizes"
        :value-id="pizzaOrder.size.id"
        @setSize="handleChangeSize"
      />
      <!--
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
import { BuilderDoughSelector, BuilderSizeSelector } from "./components";
import { calculateCostOfPizza } from "@/common/utils";
import { DEFAULT_DOUGH_ID, DEFAULT_SIZE_ID } from "@/common/constants";

export default {
  name: "Builder",
  components: { BuilderDoughSelector, BuilderSizeSelector },
  props: {
    pizzaData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pizzaOrder: {
        name: "",
        ingredients: {},
        dough: this.pizzaData.dough[DEFAULT_DOUGH_ID],
        size: this.pizzaData.sizes[DEFAULT_SIZE_ID],
      },
    };
  },
  computed: {
    total() {
      return calculateCostOfPizza(
        this.pizzaOrder.dough,
        { price: 0 },
        {},
        this.pizzaOrder.size
      );
    },
  },
  methods: {
    // setCounter(value) {
    //   console.log("setCounter", value);
    // },
    handleChangeDough(doughId) {
      this.pizzaOrder = {
        ...this.pizzaOrder,
        dough: this.pizzaData.dough[doughId],
      };
    },
    handleChangeSize(sizeId) {
      this.pizzaOrder = {
        ...this.pizzaOrder,
        size: this.pizzaData.sizes[sizeId],
      };
    },
  },
};
</script>
