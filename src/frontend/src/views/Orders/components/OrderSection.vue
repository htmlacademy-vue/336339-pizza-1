<template>
  <section
    class="sheet order"
    data-test="orderSection"
  >
    <div class="order__wrapper">
      <div class="order__number">
        <b data-test="orderTitle">Заказ {{ order.id }}</b>
      </div>
      <div class="order__sum">
        <span data-test="orderSum">Сумма заказа: {{ order.total }} ₽</span>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          data-test="orderDeleteButton"
          @click="$emit('onDelete', order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button"
          data-test="orderRepeateButton"
          @click="$emit('onRepeate', order.id)"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul
      v-if="order.orderPizzas.length > 0"
      class="order__list"
      data-test="orderList"
    >
      <li
        v-for="pizza in order.orderPizzas"
        :key="pizza.name"
        class="order__item"
        data-test="orderItem"
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
            <h2 data-test="pizzaName">{{ pizza.name }}</h2>
            <ul>
              <li data-test="pizzaSizeDough">
                {{ pizza.size }}, {{ pizza.dough }}
              </li>
              <li data-test="pizzaSauce">Соус: {{ pizza.sauce }}</li>
              <li data-test="pizzaIngredients">
                Начинка: {{ pizza.ingredients }}
              </li>
            </ul>
          </div>
        </div>

        <p class="order__price" data-test="orderPrice">
          {{ getPizzaPriceString(pizza.price, pizza.quantity) }}
        </p>
      </li>
    </ul>

    <ul
      v-if="order.orderMisc.length > 0"
      class="order__additional"
      data-test="orderAdditional"
    >
      <li
        v-for="miscItem in order.orderMisc"
        :key="miscItem.id"
        data-test="orderAdditionalItem"
      >
        <img
          :src="miscItem.image"
          width="20"
          height="30"
          :alt="miscItem.name"
        />
        <p>
          <span>{{ miscItem.name }}</span>
          <b data-test="orderMiscQuantity">{{
            getMiscQuantityTitle(miscItem)
          }}</b>
        </p>
      </li>
    </ul>

    <p class="order__address" data-test="orderAddress">
      Адрес доставки: {{ order.address }}
    </p>
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
    getMiscQuantityTitle(miscItem) {
      return `${miscItem.quantity > 1 ? `${miscItem.quantity}x ` : ""}${
        miscItem.quantity > 1 ? `${miscItem.quantity}x ` : ""
      }`;
    },
  },
};
</script>
