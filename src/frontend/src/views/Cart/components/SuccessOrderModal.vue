<template>
  <transition
    name="view"
    appear
    enter-active-class="animate__animated animate__fadeIn"
  >
    <div class="popup">
      <router-link
        :to="href"
        class="close"
      >
        <span class="visually-hidden">Закрыть попап</span>
      </router-link>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a
          :href="href"
          class="button"
          data-test="successButton"
          @click.prevent="handleOkClick"
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

<style lang="scss" scoped>
.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: $black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: $orange-100;
    }
  }
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;
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
}
.popup__button {
  a {
    padding: 16px 32px;
  }
}
</style>
