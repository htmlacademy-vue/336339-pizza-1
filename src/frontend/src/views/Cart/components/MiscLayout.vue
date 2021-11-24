<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="miscItem in misc"
        :key="miscItem.id"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img
            :src="miscItem.image"
            width="39"
            height="60"
            :alt="miscItem.name"
          />
          <span data-test="miscName">{{ miscItem.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <AppCounterControl
            :value="miscItem.quantity"
            class="additional-list__counter"
            data-test="miscQuantityControl"
            :id="miscItem.id"
            @onChange="(value) => setValue(miscItem.id, value)"
          />
          <div class="additional-list__price">
            <b data-test="miscPrice">× {{ miscItem.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { AppCounterControl } from "@/common/components";
export default {
  name: "MiscLayout",

  components: { AppCounterControl },

  props: {
    misc: {
      type: Object,
      required: true,
    },
  },

  methods: {
    setValue(id, value) {
      this.$emit("setMisc", { id, value });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}
</style>
