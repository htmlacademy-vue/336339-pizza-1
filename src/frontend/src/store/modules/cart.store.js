import {
  DELETE_ENTITY,
  RESET_STATE,
  SET_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutation-types";
import { calculateCostOfPizza, capitalize } from "@/common/utils";
import { miscToClientAdapter } from "@/common/adapters";
import { cloneDeep, uniqueId } from "lodash";

const entity = "cart";
const module = capitalize(entity);
const namespace = { entity, module };
const INIT_ADDRESS = {
  street: "",
  building: "",
  flat: "",
};

export default {
  namespaced: true,
  state: setupState(),
  mutations: {
    [RESET_STATE](state, newState = null) {
      Object.assign(state, newState || setupState());
    },
  },
  getters: {
    cartTotal({ pizzas, misc }, getters, rootState) {
      const { dough, sauces, sizes, ingredients } = rootState.Builder;
      const pizzasTotal = pizzas.reduce((accumulator, pizza) => {
        const pizzaCost = calculateCostOfPizza(
          dough[pizza.doughId],
          sauces[pizza.sauceId],
          sizes[pizza.sizeId],
          pizza.ingredients.reduce((accumulator, currentItem) => {
            accumulator[currentItem.ingredientId] = currentItem.quantity;
            return accumulator;
          }, {}),
          ingredients
        );
        return accumulator + pizzaCost * pizza.quantity;
      }, 0);
      const miscTotal = Object.keys(misc).reduce((accumulator, id) => {
        return accumulator + misc[id].quantity * misc[id].price;
      }, 0);
      return pizzasTotal + miscTotal;
    },
    adaptedPizzas({ pizzas }, getters, rootState) {
      const { dough, sauces, sizes, ingredients } = rootState.Builder;
      return pizzas.map((pizza) => ({
        ...pizza,
        dough: dough[pizza.doughId].longLabel,
        sauce: sauces[pizza.sauceId].name,
        size: sizes[pizza.sizeId].name,
        ingredients: pizza.ingredients
          .map((item) => ingredients[item.ingredientId].name)
          .join(", "),
        price: calculateCostOfPizza(
          dough[pizza.doughId],
          sauces[pizza.sauceId],
          sizes[pizza.sizeId],
          pizza.ingredients.reduce((accumulator, currentItem) => {
            accumulator[currentItem.ingredientId] = currentItem.quantity;
            return accumulator;
          }, {}),
          ingredients
        ),
      }));
    },
  },
  actions: {
    async query({ commit, rootState }) {
      const { user, isAuthenticated } = cloneDeep(rootState.Auth);
      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "misc",
          value: miscToClientAdapter(await this.$api.misc.query()),
        },
        { root: true }
      );
      if (isAuthenticated) {
        commit(
          SET_ENTITY,
          {
            ...namespace,
            entity: "phone",
            value: user?.phone,
          },
          { root: true }
        );
      }
    },
    async post({ rootState, dispatch }) {
      const data = cloneDeep(rootState.Cart);
      const userId = rootState.Auth.user.id || INIT_ADDRESS;
      await this.$api.orders.post({
        ...data,
        id: uniqueId,
        userId,
        address: data?.address?.building ? data.address : null,
        pizzas: data.pizzas.map((pizza) => {
          const clonedPizza = { ...pizza };
          delete clonedPizza["id"];
          return clonedPizza;
        }),
        misc: Object.keys(data.misc)
          .map((key) => ({
            miscId: key,
            quantity: data.misc[key].quantity,
          }))
          .filter((miscItem) => miscItem.quantity > 0),
      });
      dispatch("resetCart");
    },
    setPizzaQuantity({ commit, rootState }, { id, value: quantity }) {
      const currentPizza = rootState.Cart.pizzas.find(
        (pizza) => pizza.id === id
      );
      if (quantity > 0) {
        commit(
          UPDATE_ENTITY,
          {
            module: "Cart",
            entity: "pizzas",
            value: { ...currentPizza, quantity },
          },
          { root: true }
        );
      } else {
        commit(
          DELETE_ENTITY,
          {
            module: "Cart",
            entity: "pizzas",
            id: currentPizza.id,
          },
          { root: true }
        );
      }
    },
    setPizzaMisc({ commit, rootState }, { id, value: quantity }) {
      commit(
        SET_ENTITY,
        {
          module: "Cart",
          entity: "misc",
          value: {
            ...rootState.Cart.misc,
            [id]: { ...rootState.Cart.misc[id], quantity },
          },
        },
        { root: true }
      );
    },
    setAddress({ commit }, address) {
      commit(
        SET_ENTITY,
        {
          module: "Cart",
          entity: "address",
          value: address,
        },
        { root: true }
      );
    },
    setPhone({ commit }, phone) {
      commit(
        SET_ENTITY,
        {
          module: "Cart",
          entity: "phone",
          value: phone,
        },
        { root: true }
      );
    },
    resetCart({ commit }, newCartState = null) {
      commit(RESET_STATE, newCartState);
    },
  },
};

function setupState() {
  return {
    pizzas: [],
    misc: {},
    phone: "",
    address: INIT_ADDRESS,
  };
}
