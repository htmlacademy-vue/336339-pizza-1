<template>
  <form method="post" class="layout-form" @submit.prevent="createOrder">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <template v-if="isEmptyCart">
          <div class="sheet cart__empty" v-if="isEmptyCart">
            <p>В корзине нет ни одного товара</p>
          </div>
        </template>
        <div v-else>
          <PizzasListLayout
            :pizzas="adaptedPizzas"
            @setQuantity="setPizzaQuantity"
            @setPizzaForEdit="setPizzaForEdit"
          />
          <MiscLayout :misc="misc" @setMisc="setPizzaMisc" />
          <!--        <div class="cart__form">-->
          <!--          <div class="cart-form">-->

          <!--            <label class="cart-form__select">-->
          <!--              <span class="cart-form__label">Получение заказа:</span>-->

          <!--              <select name="test" class="select">-->
          <!--                <option value="1">Заберу сам</option>-->
          <!--                <option value="2">Новый адрес</option>-->
          <!--                <option value="3">Дом</option>-->
          <!--              </select>-->
          <!--            </label>-->

          <!--            <label class="input input&#45;&#45;big-label">-->
          <!--              <span>Контактный телефон:</span>-->
          <!--              <input type="text" name="tel" placeholder="+7 999-999-99-99">-->
          <!--            </label>-->

          <!--            <div class="cart-form__address">-->
          <!--              <span class="cart-form__label">Новый адрес:</span>-->

          <!--              <div class="cart-form__input">-->
          <!--                <label class="input">-->
          <!--                  <span>Улица*</span>-->
          <!--                  <input type="text" name="street">-->
          <!--                </label>-->
          <!--              </div>-->

          <!--              <div class="cart-form__input cart-form__input&#45;&#45;small">-->
          <!--                <label class="input">-->
          <!--                  <span>Дом*</span>-->
          <!--                  <input type="text" name="house">-->
          <!--                </label>-->
          <!--              </div>-->

          <!--              <div class="cart-form__input cart-form__input&#45;&#45;small">-->
          <!--                <label class="input">-->
          <!--                  <span>Квартира</span>-->
          <!--                  <input type="text" name="apartment">-->
          <!--                </label>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
      </div>
    </main>
    <CartFooterView
      :total="cartTotal"
      v-if="!isEmptyCart"
      @onChange="createOrder"
    />
  </form>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import {
  CartFooterView,
  PizzasListLayout,
  MiscLayout,
} from "@/modules/cart/components";
export default {
  name: "Cart",
  components: { CartFooterView, PizzasListLayout, MiscLayout },
  computed: {
    ...mapState("Cart", ["pizzas", "misc"]),
    ...mapGetters("Cart", ["cartTotal", "adaptedPizzas"]),
    checkedMiscLength() {
      return Object.keys(this.misc).reduce((accumulator, id) => {
        return accumulator + this.misc[id].quantity;
      }, 0);
    },
    isEmptyCart() {
      return this.cartTotal === 0;
    },
  },
  methods: {
    ...mapActions("Cart", ["setPizzaQuantity", "setPizzaMisc"]),
    ...mapActions("Builder", ["resetBuilder"]),
    createOrder() {
      console.log("createOrder");
    },
    setPizzaForEdit({ id }) {
      const checkedPizza = this.pizzas.find((pizza) => pizza.id === id);
      this.resetBuilder({
        ...checkedPizza,
        ingredients: checkedPizza.ingredients.reduce((accumulator, item) => {
          accumulator[item.ingredientId] = item.quantity;
          return accumulator;
        }, {}),
      });
      this.$router.push("/");
    },
  },
};
</script>
