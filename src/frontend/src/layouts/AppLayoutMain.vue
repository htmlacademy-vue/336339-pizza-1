<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="/" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="#">{{ total }} ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
};
</script>
