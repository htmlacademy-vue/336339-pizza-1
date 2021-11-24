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
      }${miscItem.price} ₽`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;
  justify-content: space-between;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;

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
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.order__list {
  @include clear-list;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: $green-400;
  }

  &:active:not(:disabled) {
    background-color: $green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }
}
</style>
