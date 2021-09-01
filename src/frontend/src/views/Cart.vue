<template>
  <div>
    <CartModule />
  </div>
</template>

<script>
import { Cart as CartModule } from "@/modules";

export default {
  name: "Cart",
  components: { CartModule },
};
</script>
