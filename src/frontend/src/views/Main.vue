<template>
  <AppLayout :total="0"> <Builder :pizzaData="pizzaData" /> </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import Builder from "@/modules/builder/Bulider";
import pizza from "@/static/pizza.json";
import {
  doughToClientAdapter,
  sizesToClientAdapter,
  saucesToClientAdapter,
  ingredientsToClientAdapter,
} from "@/common/adapters";

export default {
  name: "Index",
  components: { AppLayout, Builder },
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
