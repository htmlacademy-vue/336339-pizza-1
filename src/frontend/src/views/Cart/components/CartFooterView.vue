<template>
  <section class="footer">
    <div class="footer__more">
      <router-link
        to="/"
        class="button button--border button--arrow"
      >
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b data-test="footerTotal">Итого: {{ total }} ₽</b>
    </div>

    <div class="footer__submit">
      <button
        type="submit"
        class="button"
      >Оформить заказ</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "CartFooterView",

  props: {
    total: {
      type: Number,
      required: true,
    },
  },
};
</script>
