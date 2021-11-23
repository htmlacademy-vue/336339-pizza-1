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
<style scoped>
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
</style>
