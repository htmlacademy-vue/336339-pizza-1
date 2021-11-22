<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <OrderSection
      v-for="order in adaptedOrders"
      :key="order.id"
      :order="order"
      @onRepeate="handleRepeatClick"
      @onDelete="deleteOrder"
    />
  </div>
</template>

<script>
import { auth, isAuthenticated } from "@/middlewares";
import { TRANSITION_ENTER_ACTIVE_CLASS } from "@/common/constants";
import OrderSection from "@/views/Orders/components/OrderSection";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Orders",

  layout: "AppLayoutWithSidebar",

  middlewares: [auth, isAuthenticated],

  enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,

  components: { OrderSection },

  computed: {
    ...mapGetters("Orders", ["adaptedOrders"]),
  },

  created() {
    this.query();
  },

  methods: {
    ...mapActions("Orders", ["repeatOrder", "deleteOrder", "query"]),
    async handleRepeatClick(orderId) {
      await this.repeatOrder(orderId);
      await this.$router.push("/cart");
    },
  },
};
</script>
