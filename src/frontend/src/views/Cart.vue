<template>
  <CartModule />
</template>

<script>
import { Cart as CartModule } from "@/modules";
import { TRANSITION_ENTER_ACTIVE_CLASS } from "@/common/constants";

export default {
  name: "Cart",
  layout: "AppLayoutWithHeader",
  enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,
  components: { CartModule },
};
</script>
