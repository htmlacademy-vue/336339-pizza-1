<template>
  <ul class="cart-list sheet">
    <li
      v-for="pizza in pizzas"
      :key="pizza.id"
      class="cart-list__item"
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
              Начинка: {{ getIngredientsTitle(pizza) }}
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

  methods: {
    setValue(id, value) {
      this.$emit("setQuantity", { id, value });
    },

    setPizzaForEdit(id) {
      this.$emit("setPizzaForEdit", { id });
    },

    getIngredientsTitle(pizza) {
      return pizza.ingredients.toLowerCase();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";

.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
