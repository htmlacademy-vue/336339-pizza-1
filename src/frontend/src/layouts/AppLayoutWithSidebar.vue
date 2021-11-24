<template>
  <div>
    <AppHeader
      :cart-total="cartTotal"
      :is-authenticated="isAuthenticated"
      :user="user"
      @logout="$logout"
    />
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <a
          href="/"
          class="logo layout__logo"
        >
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>

        <router-link
          class="layout__link"
          active-class="layout__link--active"
          to="/orders"
          >История заказов</router-link
        >
        <router-link
          class="layout__link"
          active-class="layout__link--active"
          to="/profile"
          >Мои данные</router-link
        >
      </div>
      <slot />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { logout } from "@/common/mixins";
import AppHeader from "./components/AppHeader";

export default {
  name: "AppLayoutWithSidebar",

  components: { AppHeader },

  mixins: [logout],

  computed: {
    ...mapState("Auth", ["user", "isAuthenticated"]),

    ...mapGetters("Cart", ["cartTotal"]),

    currentRoute() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: block;

  img {
    display: block;

    width: 90px;
    height: 40px;
  }
}
</style>
