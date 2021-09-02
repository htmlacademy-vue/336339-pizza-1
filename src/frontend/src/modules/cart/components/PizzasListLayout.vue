<template>
  <ul class="cart-list sheet">
    <li class="cart-list__item" v-for="pizza in pizzas" :key="pizza.id">
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.name"
        />
        <div class="product__text">
          <h2>{{ pizza.name }}</h2>
          <ul>
            <li>{{ pizza.size }}, {{ pizza.dough }}</li>
            <li>Соус: {{ pizza.sauce }}</li>
            <li>Начинка: {{ pizza.ingredients.toLowerCase() }}</li>
          </ul>
        </div>
      </div>
      <CounterControl
        :value="pizza.quantity"
        @onChange="setValue"
        :id="pizza.id"
      />
      <div class="cart-list__price">
        <b>{{ pizza.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="setPizzaForEdit(pizza.id)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import CounterControl from "@/common/components/CounterControl";
export default {
  name: "PizzasListLayout",
  components: { CounterControl },
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
  },
};
</script>
