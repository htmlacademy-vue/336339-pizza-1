<template>
  <div class="content__constructor">
    <div
      class="pizza"
      :class="`pizza--foundation--${dough.value}-${sauce.value}`"
    >
      <div class="pizza__wrapper">
        <div
          class="pizza__filling"
          v-for="value in ingredients"
          :key="value.id"
          :class="getPizzaClasses(value)"
        ></div>
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
  methods: {
    getPizzaClasses(ingredient) {
      return {
        ["pizza__filling--" + ingredient.label]: ingredient.label,
        "pizza__filling--second": ingredient.quantity === 2,
        "pizza__filling--third": ingredient.quantity === 3,
      };
    },
  },
};
</script>
