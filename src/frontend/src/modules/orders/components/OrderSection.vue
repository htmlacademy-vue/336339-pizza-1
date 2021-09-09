<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ {{ order.id }}</b>
      </div>
      <div class="order__sum">
        <span>Сумма заказа: {{ order.total }} ₽</span>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="$emit('onDelete', order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button"
          @click="$emit('onRepeate', order.id)"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list" v-if="order.orderPizzas.length > 0">
      <li
        class="order__item"
        v-for="pizza in order.orderPizzas"
        :key="pizza.name"
      >
        <div class="product">
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
              <li>Начинка: {{ pizza.ingredients }}</li>
            </ul>
          </div>
        </div>

        <p class="order__price">
          {{ getPizzaPriceString(pizza.price, pizza.quantity) }}
        </p>
      </li>
    </ul>

    <ul class="order__additional" v-if="order.orderMisc.length > 0">
      <li v-for="miscItem in order.orderMisc" :key="miscItem.id">
        <img
          :src="miscItem.image"
          width="20"
          height="30"
          :alt="miscItem.name"
        />
        <p>
          <span>{{ miscItem.name }}</span>
          <b
            >{{ `${miscItem.quantity > 1 ? `${miscItem.quantity}x ` : ""}`
            }}{{ miscItem.price }} ₽</b
          >
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: {{ order.address }}</p>
  </section>
</template>

<script>
export default {
  name: "OrderSection",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getPizzaPriceString(price, quantity) {
      return `${quantity > 1 ? `${quantity}x` : ""}${price} ₽`;
    },
  },
};
</script>
