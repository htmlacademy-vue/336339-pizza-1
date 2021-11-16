<template>
  <ul class="cart-list sheet">
    <li
      :key="pizza.id"
      class="cart-list__item"
      v-for="pizza in pizzas"
      data-test="cartPizzaItem"
    >
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.name"
        />
        <div class="product__text">
          <h2 data-test="pizzaName">{{ pizza.name }}</h2>
          <ul>
            <li data-test="pizzaSizeDough">
              {{ pizza.size }}, {{ pizza.dough }}
            </li>
            <li data-test="pizzaSauce">Соус: {{ pizza.sauce }}</li>
            <li data-test="pizzaIngredients">
              Начинка: {{ ingredientsTitle }}
            </li>
          </ul>
        </div>
      </div>
      <AppCounterControl
        :value="pizza.quantity"
        :id="pizza.id"
        @onChange="(value) => setValue(pizza.id, value)"
      />
      <div class="cart-list__price">
        <b data-test="pizzaPrice">{{ pizza.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          data-test="pizzaEditButton"
          @click="setPizzaForEdit(pizza.id)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { AppCounterControl } from "@/common/components";
export default {
  name: "PizzasListLayout",

  components: { AppCounterControl },

  props: {
    pizzas: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ingredientsTitle() {
      return this.pizza.ingredients.toLowerCase();
    },
  },

  methods: {
    setValue(id, value) {
      this.$emit("setQuantity", { id, value });
    },
    setPizzaForEdit(id) {
      this.$emit("setPizzaForEdit", { id });
    },
  },
};
</script>
