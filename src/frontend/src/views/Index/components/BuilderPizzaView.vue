<template>
  <div class="content__constructor">
    <div
      class="pizza"
      :class="`pizza--foundation--${dough.value}-${sauce.value}`"
    >
      <div class="pizza__wrapper">
        <div
          v-for="value in ingredients"
          :key="value.id"
        >
          <div
            v-if="value.quantity > 0"
            class="pizza__filling"
            :class="`pizza__filling--${value.label}`"
          />
          <div
            v-if="value.quantity > 1"
            class="pizza__filling pizza__filling--second"
            :class="`pizza__filling--${value.label}`"
          />
          <div
            v-if="value.quantity > 2"
            class="pizza__filling pizza__filling--third"
            :class="`pizza__filling--${value.label}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",

  props: {
    ingredients: {
      type: Object,
      required: true,
    },

    dough: {
      type: Object,
      required: true,
    },

    sauce: {
      type: Object,
      required: true,
    },
  },
};
</script>
