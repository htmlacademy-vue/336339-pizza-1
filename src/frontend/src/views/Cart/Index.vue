<template>
  <form
    method="post"
    class="layout-form"
    @submit.prevent="handleSubmitCart"
    data-test="cartForm"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <div
          v-if="isEmptyCart"
          class="sheet cart__empty"
          key="emptyCart"
          data-test="emptyCart"
        >
          <p>В корзине нет ни одного товара</p>
        </div>
        <div v-else key="notEmptyCart" data-test="notEmptyCart">
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
      data-test="cartFooter"
    />
    <SuccessOrderModal
      :href="hrefForModal"
      v-if="isOpenModal"
      data-test="successModal"
    />
  </form>
</template>

<script>
import { TRANSITION_ENTER_ACTIVE_CLASS } from "@/common/constants";
import {
  CartFooterView,
  DeliveryLayout,
  MiscLayout,
  PizzasListLayout,
  SuccessOrderModal,
} from "@/views/Cart/components";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Cart",

  layout: "AppLayoutWithHeader",

  enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,

  components: {
    CartFooterView,
    PizzasListLayout,
    MiscLayout,
    DeliveryLayout,
    SuccessOrderModal,
  },

  data() {
    return {
      isOpenModal: false,
    };
  },

  computed: {
    ...mapState("Cart", ["pizzas", "misc", "address", "phone"]),
    ...mapState("Auth", ["user", "addresses"]),
    ...mapGetters("Cart", ["cartTotal", "adaptedPizzas"]),
    checkedMiscLength() {
      return Object.keys(this.misc).reduce((accumulator, id) => {
        return accumulator + this.misc[id].quantity;
      }, 0);
    },
    isEmptyCart() {
      return this.cartTotal === 0;
    },
    isAuth() {
      return Boolean(this.user);
    },
    hrefForModal() {
      return this.isAuth ? "/orders" : "/";
    },
  },

  methods: {
    ...mapActions("Cart", [
      "setPizzaQuantity",
      "setPizzaMisc",
      "setAddress",
      "setPhone",
      "post",
    ]),
    ...mapActions("Builder", ["resetBuilder"]),
    handleSubmitCart() {
      this.post();
      this.isOpenModal = true;
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
