<template>
  <div class="content__constructor">
    <div
      class="pizza"
      :class="`pizza--foundation--${pizza.dough.value}-${pizza.sauce.value}`"
    >
      <div class="pizza__wrapper">
        <div
          class="pizza__filling"
          v-for="value in filteredIngredients"
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
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filteredIngredients() {
      return Object.keys(this.pizza.ingredients).reduce((accumulator, key) => {
        if (this.pizza.ingredients[key].quantity > 0) {
          accumulator[key] = { ...this.pizza.ingredients[key] };
        }
        return accumulator;
      }, {});
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
