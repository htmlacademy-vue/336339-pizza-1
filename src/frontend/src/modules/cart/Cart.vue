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
          <DeliveryLayout
            :phone="phone"
            :address="address"
            :addresses="addresses"
            @setAddress="setAddress"
            @setPhone="setPhone"
          />
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
  DeliveryLayout,
} from "@/modules/cart/components";
export default {
  name: "Cart",
  components: { CartFooterView, PizzasListLayout, MiscLayout, DeliveryLayout },
  computed: {
    ...mapState("Cart", ["pizzas", "misc", "phone", "address", "addresses"]),
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
    ...mapActions("Cart", [
      "setPizzaQuantity",
      "setPizzaMisc",
      "setAddress",
      "setPhone",
    ]),
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
