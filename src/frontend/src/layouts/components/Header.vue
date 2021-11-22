<template>
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
      <template v-if="isAuthenticated">
        <router-link to="/profile" data-test="user-block">
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
        <a href="#" @click.prevent="$emit('logout')" class="header__logout">
          <span>Выйти</span>
        </a>
      </template>
      <router-link
        v-else
        to="/login"
        class="header__login"
        data-test="user-login"
      >
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",

  props: {
    user: {
      type: Object,
      default: () => {},
    },
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
    cartTotal: {
      type: Number,
      required: true,
    },
  },
};
</script>
