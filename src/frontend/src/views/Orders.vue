<template>
  <OrdersModule />
</template>

<script>
import { Orders as OrdersModule } from "@/modules";
import { auth, isAuthenticated } from "@/middlewares";
import { TRANSITION_ENTER_ACTIVE_CLASS } from "@/common/constants";

export default {
  name: "Orders",
  layout: "AppLayoutWithSidebar",
  middlewares: [auth, isAuthenticated],
  enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,
  components: { OrdersModule },
};
</script>
