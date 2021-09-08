<template>
  <div>
    <Header
      :cartTotal="cartTotal"
      isAuthenticated="isAuthenticated"
      :user="user"
      @logout="$logout"
    />
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <a href="/" class="logo layout__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>

        <router-link
          :class="[
            { 'layout__link--active': currentRoute === '/orders' },
            'layout__link',
          ]"
          to="/orders"
          >История заказов</router-link
        >
        <router-link
          class="layout__link"
          :class="[
            { 'layout__link--active': currentRoute === '/profile' },
            'layout__link',
          ]"
          to="/profile"
          >Мои данные</router-link
        >
      </div>
      <div class="layout__content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { logout } from "@/common/mixins";
import Header from "./components/Header";

export default {
  name: "AppLayoutWithHeader",
  mixins: [logout],
  components: { Header },
  computed: {
    ...mapState("Auth", ["user", "isAuthenticated"]),
    ...mapGetters("Cart", ["cartTotal"]),
    currentRoute() {
      return this.$route.path;
    },
  },
};
</script>
