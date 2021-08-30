<template>
  <div>
    <Builder :pizzaData="pizzaData" />
    <router-view />
  </div>
</template>

<script>
import Builder from "@/modules/builder/Bulider";
import pizza from "@/static/pizza.json";
import {
  doughToClientAdapter,
  sizesToClientAdapter,
  saucesToClientAdapter,
  ingredientsToClientAdapter,
} from "@/common/adapters";

export default {
  name: "Main",
  components: { Builder },
  data() {
    return {
      pizzaData: {
        dough: doughToClientAdapter(pizza.dough),
        sizes: sizesToClientAdapter(pizza.sizes),
        sauces: saucesToClientAdapter(pizza.sauces),
        ingredients: ingredientsToClientAdapter(pizza.ingredients),
      },
    };
  },
};
</script>
