import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_PIZZA,
  RESET_PIZZA,
  UPDATE_ENTITY,
} from "@/store/mutation-types";
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
    pizzaPrice({ pizza, dough, sauces, sizes, ingredients }) {
      const { doughId, sauceId, sizeId, ingredients: pizzaIngredients } = pizza;
      return calculateCostOfPizza(
        dough[doughId],
        sauces[sauceId],
        sizes[sizeId],
        pizzaIngredients,
        ingredients
      );
    },
    ingredientsWithCount({ ingredients, pizza }) {
      return Object.keys(ingredients).reduce((accumulator, ingredientId) => {
        accumulator[ingredientId] = {
          ...ingredients[ingredientId],
          quantity: pizza.ingredients?.[ingredientId] || 0,
        };
        return accumulator;
      }, {});
    },
  },
  mutations: {
    [UPDATE_PIZZA](state, pizza) {
      state.pizza = { ...state.pizza, ...pizza };
    },
    [RESET_PIZZA](state, initialPizza = null) {
      if (initialPizza) {
        state.pizza = { ...initialPizza };
      } else {
        state.pizza = setupPizzaState({
          sizeId: DEFAULT_SIZE_ID,
          doughId: DEFAULT_DOUGH_ID,
          sauceId: DEFAULT_SAUCE_ID,
        });
      }
    },
  },
  actions: {
    async query({ commit }) {
      let [ingredientsData, sizesData, doughData, saucesData] =
        await Promise.all([
          this.$api.ingredients.query(),
          this.$api.sizes.query(),
          this.$api.dough.query(),
          this.$api.sauces.query(),
        ]);

      const entities = {
        ingredients: ingredientsToClientAdapter(ingredientsData),
        sizes: sizesToClientAdapter(sizesData),
        dough: doughToClientAdapter(doughData),
        sauces: saucesToClientAdapter(saucesData),
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
    post({ commit, rootState }) {
      const data = cloneDeep(rootState.Builder.pizza);
      if (data.id) {
        commit(
          UPDATE_ENTITY,
          {
            module: "Cart",
            entity: "pizzas",
            value: {
              ...data,
              ingredients: Object.keys(data.ingredients).map((key) => ({
                ingredientId: key,
                quantity: data.ingredients[key],
              })),
            },
          },
          { root: true }
        );
      } else {
        commit(
          ADD_ENTITY,
          {
            module: "Cart",
            entity: "pizzas",
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
      }
    },
    resetBuilder({ commit }, initialPizza = null) {
      commit(RESET_PIZZA, initialPizza);
    },
    putDough({ commit }, doughId) {
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
