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
import { mapActions, mapGetters } from "vuex";
import OrderSection from "./components/OrderSection";

export default {
  name: "Orders",
  components: { OrderSection },
  computed: {
    ...mapGetters("Orders", ["adaptedOrders"]),
  },
  methods: {
    ...mapActions("Orders", ["repeatOrder", "deleteOrder", "query"]),
    async handleRepeatClick(orderId) {
      await this.repeatOrder(orderId);
      await this.$router.push("/cart");
    },
  },
  created() {
    this.query();
  },
};
</script>
