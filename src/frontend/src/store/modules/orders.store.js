import { SET_ENTITY } from "@/store/mutation-types";
import { capitalize } from "@/common/utils";
import { ordersToClientAdapter } from "@/common/adapters";

const entity = "orders";
const module = capitalize(entity);
const namespace = { entity, module };

const INITIAL_ORDERS = [];

export default {
  namespaced: true,
  state: { orders: INITIAL_ORDERS },
  getters: {
    adaptedOrders({ orders }, getters, rootState) {
      const { dough, sauces, sizes, ingredients } = rootState.Builder;
      console.log(dough, sauces, sizes, ingredients);
      return ordersToClientAdapter(
        orders,
        dough,
        sauces,
        sizes,
        ingredients,
        rootState.Cart.misc
      );
    },
  },
  actions: {
    async query({ commit }) {
      const data = await this.$api.orders.query();
      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "orders",
          value: data,
        },
        { root: true }
      );
    },
    // eslint-disable-next-line no-unused-vars
    async repeatOrder({ commit }, orderId) {
      console.log("repeatOrder", orderId);
    },
    // eslint-disable-next-line no-unused-vars
    async deleteOrder({ commit }, orderId) {
      console.log("deleteOrder", orderId);
    },
  },
};
