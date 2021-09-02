import userMock from "@/static/user.json";
import { SET_ENTITY } from "@/store/mutation-types";
import { capitalize } from "@/common/utils";

const entity = "auth";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    user: null,
  },
  actions: {
    query({ commit }) {
      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "user",
          value: userMock,
        },
        { root: true }
      );
    },
    logout({ commit }) {
      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "user",
          value: null,
        },
        { root: true }
      );
    },
  },
};
