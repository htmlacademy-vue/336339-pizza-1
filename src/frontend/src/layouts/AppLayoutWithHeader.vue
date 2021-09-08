<template>
  <div>
    <Header
      :cartTotal="cartTotal"
      :isAuthenticated="isAuthenticated"
      :user="user"
      @logout="$logout"
    />
    <slot />
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
  },
};
</script>
