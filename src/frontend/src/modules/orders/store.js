import { SET_ENTITY } from "@/store/mutation-types";
import { capitalize } from "@/common/utils";
import {
  ordersToClientAdapter,
  orderToCartStateAdapter,
} from "@/common/adapters";

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
    async repeatOrder({ dispatch, rootState }, orderId) {
      const repeatedOrder = rootState.Orders.orders.find(
        (order) => order.id === orderId
      );
      const miscData = rootState.Cart.misc;
      const newMisc = Object.keys(miscData).reduce((accumulator, key) => {
        accumulator[key] = {
          ...miscData[key],
          quantity: 0,
        };
        return accumulator;
      }, {});
      repeatedOrder.misc = repeatedOrder.orderMisc
        ? repeatedOrder.orderMisc.reduce((accumulator, item) => {
            const currentMiscId = item.miscId;
            accumulator[currentMiscId] = {
              ...newMisc[currentMiscId],
              quantity: item.quantity,
            };
            return accumulator;
          }, newMisc)
        : newMisc;
      await dispatch("Cart/resetCart", orderToCartStateAdapter(repeatedOrder), {
        root: true,
      });
    },

    async deleteOrder({ dispatch }, orderId) {
      await this.$api.orders.delete(orderId);
      await dispatch("query");
    },
  },
};
