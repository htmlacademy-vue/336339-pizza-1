<template>
  <transition
    name="view"
    appear
    enter-active-class="animate__animated animate__fadeIn"
  >
    <div class="popup">
      <router-link :to="href" class="close">
        <span class="visually-hidden">Закрыть попап</span>
      </router-link>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a :href="href" class="button" @click.prevent="handleOkClick"
          >Отлично, я жду!</a
        >
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
import { animateCSS } from "@/common/utils";

export default {
  name: "SuccessOrderModal",
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions("Cart", ["resetCart"]),
    handleOkClick() {
      animateCSS(".popup", "fadeOut").then(() => {
        this.$router.push(this.href);
        this.resetCart();
      });
    },
  },
};
</script>
