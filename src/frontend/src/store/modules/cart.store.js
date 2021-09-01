import miscMock from "@/static/misc.json";
import { ADD_ENTITY, SET_ENTITY } from "@/store/mutation-types";
import { calculateCostOfPizza, capitalize } from "@/common/utils";
import { miscToClientAdapter } from "@/common/adapters";
import { cloneDeep, uniqueId } from "lodash";

const entity = "cart";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    pizzas: [],
    misc: [],
    phone: "",
    newAddress: {
      street: "",
      building: "",
      flat: "",
    },
  },
  getters: {
    cartTotal({ pizzas, misc }, getters, rootState) {
      const { dough, sauces, sizes, ingredients } = rootState.Builder;
      const pizzasTotal = pizzas.reduce((accumulator, pizza) => {
        return (
          accumulator +
          calculateCostOfPizza(
            dough[pizza.doughId],
            sauces[pizza.sauceId],
            sizes[pizza.sizeId],
            pizza.ingredients.reduce((accumulator, currentItem) => {
              accumulator[currentItem.ingredientId] = currentItem.quantity;
              return accumulator;
            }, {}),
            ingredients
          )
        );
      }, 0);
      const miscTotal = Object.keys(misc).reduce((accumulator, id) => {
        return accumulator + misc[id].quantity * misc[id].price;
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
    post({ commit, rootState }) {
      const data = cloneDeep(rootState.Cart);
      const userId = rootState.Auth.user.id || null;
      commit(
        ADD_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          value: {
            ...data,
            id: uniqueId,
            userId,
            misc: Object.keys(data.misc).map((key) => ({
              miscId: key,
              quantity: data.misc[key],
            })),
          },
        },
        { root: true }
      );
    },
  },
};
