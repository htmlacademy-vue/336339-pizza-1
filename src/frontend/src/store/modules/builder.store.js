import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_PIZZA,
  RESET_STATE,
} from "@/store/mutation-types";
import pizzaMocks from "@/static/pizza.json";
import { calculateCostOfPizza, capitalize } from "@/common/utils";
import { cloneDeep, uniqueId } from "lodash";
import {
  DEFAULT_DOUGH_ID,
  DEFAULT_SAUCE_ID,
  DEFAULT_SIZE_ID,
} from "@/common/constants";
import {
  doughToClientAdapter,
  ingredientsToClientAdapter,
  saucesToClientAdapter,
  sizesToClientAdapter,
} from "@/common/adapters";

const entity = "builder";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: setupState(),
  getters: {
    pizzaPrice({ pizza, dough, sauces, sizes }, getters) {
      const { doughId, sauceId, sizeId } = pizza;
      return calculateCostOfPizza(
        dough[doughId],
        sauces[sauceId],
        sizes[sizeId],
        getters.ingredientsWithCount
      );
    },
    ingredientsWithCount({ ingredients, pizza }) {
      return Object.keys(ingredients).reduce((accumulator, ingredientId) => {
        accumulator[ingredientId] = {
          ...ingredients[ingredientId],
          count: pizza.ingredients?.[ingredientId] || 0,
        };
        return accumulator;
      }, {});
    },
  },
  mutations: {
    [UPDATE_PIZZA](state, pizza) {
      state.pizza = { ...state.pizza, ...pizza };
    },
    // [SET_INGREDIENTS](state, ingredients) {
    //   state.ingredients = ingredients;
    // },
    [RESET_STATE](state) {
      state.pizza = setupPizzaState({
        sizeId: DEFAULT_SIZE_ID,
        doughId: DEFAULT_DOUGH_ID,
        sauceId: DEFAULT_SAUCE_ID,
      });
    },
  },
  actions: {
    query({ commit }) {
      const entities = {
        ingredients: ingredientsToClientAdapter(pizzaMocks.ingredients),
        sizes: sizesToClientAdapter(pizzaMocks.sizes),
        dough: doughToClientAdapter(pizzaMocks.dough),
        sauces: saucesToClientAdapter(pizzaMocks.sauces),
      };
      Object.keys(entities).forEach((entityKey) => {
        commit(
          SET_ENTITY,
          {
            ...namespace,
            entity: entityKey,
            value: entities[entityKey],
          },
          { root: true }
        );
      });
    },
    post({ commit }, pizza) {
      const data = cloneDeep(pizza);

      commit(
        ADD_ENTITY,
        {
          module: "Cart",
          entity: "mainOrder",
          value: {
            ...data,
            id: uniqueId(),
            ingredients: Object.keys(data.ingredients).map((key) => ({
              ingredientId: key,
              quantity: data.ingredients[key],
            })),
          },
        },
        { root: true }
      );
    },
    putDough({ commit }, doughId) {
      console.log(doughId);
      commit(UPDATE_PIZZA, {
        doughId,
      });
    },
    putSize({ commit }, sizeId) {
      commit(UPDATE_PIZZA, {
        sizeId,
      });
    },
    putSauce({ commit }, sauceId) {
      commit(UPDATE_PIZZA, {
        sauceId,
      });
    },
    putName({ commit }, name) {
      commit(UPDATE_PIZZA, {
        name,
      });
    },
    putIngredient({ commit, rootState }, { id, value }) {
      const newIngredients = { ...rootState.Builder.pizza.ingredients };
      if (value > 0) {
        newIngredients[id] = value;
      } else {
        delete newIngredients[id];
      }
      commit(UPDATE_PIZZA, {
        ingredients: newIngredients,
      });
    },
  },
};

function setupState() {
  return {
    pizza: setupPizzaState({
      doughId: DEFAULT_DOUGH_ID,
      sizeId: DEFAULT_SIZE_ID,
      sauceId: DEFAULT_SAUCE_ID,
    }),
    dough: {},
    sizes: {},
    sauces: {},
    ingredients: {},
  };
}

function setupPizzaState({ doughId, sizeId, sauceId }) {
  return {
    name: "",
    quantity: 1,
    doughId,
    sizeId,
    sauceId,
    ingredients: {},
  };
}
