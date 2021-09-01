import miscMock from "@/static/misc.json";
import { SET_ENTITY } from "@/store/mutation-types";
import { capitalize } from "@/common/utils";
import { miscToClientAdapter } from "@/common/adapters";

const entity = "cart";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    pizzas: [],
    misc: [],
    newAddress: {
      street: "",
      building: "",
      flat: "",
    },
  },
  getters: {
    cartTotal({ pizzas, misc }) {
      const pizzasTotal = pizzas.reduce((accumulator, pizza) => {
        return accumulator + pizza.count * pizza.cost;
      }, 0);
      const miscTotal = Object.keys(misc).reduce((accumulator, id) => {
        return accumulator + misc[id].count * misc[id].price;
      }, 0);
      return pizzasTotal + miscTotal;
    },
  },
  actions: {
    query({ commit }) {
      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "misc",
          value: miscToClientAdapter(miscMock),
        },
        { root: true }
      );
    },
  },
};
