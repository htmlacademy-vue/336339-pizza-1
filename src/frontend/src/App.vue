<template>
  <div id="app">
    <AppLayout>
      <transition name="view" appear :enter-active-class="enterActiveClass">
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  computed: {
    enterActiveClass() {
      return this.$route.meta.enterActiveClass || "";
    },
  },

  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
