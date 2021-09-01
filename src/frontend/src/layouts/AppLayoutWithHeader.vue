<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <router-link to="/" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
      </div>
      <div class="header__cart">
        <router-link to="/cart">{{ cartTotal }} ₽</router-link>
      </div>
      <div class="header__user">
        <template v-if="isAuth">
          <router-link to="profile">
            <picture>
              <source
                type="image/webp"
                srcset="
                  @/assets/img/users/user5.webp    1x,
                  @/assets/img/users/user5@2x.webp 2x
                "
              />
              <img
                src="@/assets/img/users/user5.jpg"
                srcset="@/assets/img/users/user5@2x.jpg"
                :alt="user.name"
                width="32"
                height="32"
              />
            </picture>
            <span>{{ user.name }}</span>
          </router-link>
          <a href="#" @click.prevent="handleLogout" class="header__logout"
            ><span>Выйти</span></a
          >
        </template>
        <router-link v-else :to="routerUri" class="header__login">
          <span>Войти</span>
        </router-link>
      </div>
    </header>
    <slot />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "AppLayoutWithHeader",

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Cart", ["cartTotal"]),
    routerUri() {
      return this.$route.path === "/" ? "/login" : "/sign-in";
    },
    isAuth() {
      return Boolean(this.user);
    },
  },
  methods: {
    ...mapActions("Auth", ["logout"]),
    handleLogout() {
      this.logout();
    },
  },
};
</script>
