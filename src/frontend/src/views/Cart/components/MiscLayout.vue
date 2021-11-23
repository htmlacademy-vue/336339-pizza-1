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
