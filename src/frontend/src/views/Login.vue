<template>
  <div class="modal">
    <div class="sign-form">
      <router-link
        to="/"
        class="close close--white"
      >
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </router-link>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form @submit.prevent="login">
        <div class="sign-form__input">
          <AppInput
            v-model="email"
            ref="email"
            :label="'E-mail'"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            :error-text="validations.email.error"
            data-test="email-input"
          />
        </div>
        <div class="sign-form__input">
          <AppInput
            v-model="password"
            :label="'Пароль'"
            type="password"
            name="pass"
            placeholder="***********"
            :error-text="validations.password.error"
            data-test="password-input"
          />
        </div>
        <button
          type="submit"
          class="button"
        >Авторизоваться</button>
      </form>
    </div>
  </div>
</template>

<script>
import validator from "@/common/mixins/validator";
import { AppInput } from "@/common/components";
import { isLoggedIn } from "@/middlewares";
import { TRANSITION_ENTER_ACTIVE_CLASS } from "@/common/constants";

export default {
  name: "Login",

  layout: "AppEmptyLayout",

  middlewares: [isLoggedIn],

  enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,

  components: { AppInput },

  mixins: [validator],

  data: () => ({
    email: "",
    password: "",
    validations: {
      email: {
        error: "",
        rules: ["required", "email"],
      },
      password: {
        error: "",
        rules: ["required"],
      },
    },
  }),

  watch: {
    email() {
      this.$clearValidationErrors();
    },

    password() {
      this.$clearValidationErrors();
    },
  },

  mounted() {
    this.$refs.email.$refs.input.focus();
  },

  methods: {
    async login() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      try {
        await this.$store.dispatch("Auth/login", {
          email: this.email,
          password: this.password,
        });
        await this.$router.push("/");
      } catch (e) {
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>
<style scoped lang="scss">
.sign-form {
  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
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

  &--white {
    &::before,
    &::after {
      background-color: $white;
    }
  }
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--small {
    @include b-s18-h21;
  }
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
</style>
