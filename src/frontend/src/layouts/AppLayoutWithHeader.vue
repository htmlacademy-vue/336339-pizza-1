<template>
  <div>
    <AppHeader
      :cart-total="cartTotal"
      :is-authenticated="isAuthenticated"
      :user="user"
      @logout="$logout"
    />
    <slot />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { logout } from "@/common/mixins";
import AppHeader from "./components/AppHeader";

export default {
  name: "AppLayoutWithHeader",

  components: { AppHeader },

  mixins: [logout],

  computed: {
    ...mapState("Auth", ["user", "isAuthenticated"]),

    ...mapGetters("Cart", ["cartTotal"]),
  },
};
</script>
