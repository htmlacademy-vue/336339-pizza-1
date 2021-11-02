import { SET_ENTITY } from "@/store/mutation-types.js";
import { addressesToClientAdapter } from "@/common/adapters";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: {},
    addresses: {},
  },

  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      await dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(
        SET_ENTITY,
        { module: "Auth", entity: "isAuthenticated", value: false },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module: "Auth", entity: "user", value: null },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        const addressesData = await this.$api.addresses.query();
        commit(
          SET_ENTITY,
          { module: "Auth", entity: "isAuthenticated", value: true },
          { root: true }
        );
        commit(
          SET_ENTITY,
          { module: "Auth", entity: "user", value: data },
          { root: true }
        );
        commit(
          SET_ENTITY,
          {
            module: "Auth",
            entity: "addresses",
            value: addressesToClientAdapter(
              addressesData.filter((address) => address.userId === data.id)
            ),
          },
          { root: true }
        );
      } catch {
        dispatch("logout", false);
      }
    },
    async createAddress({ commit, rootState }, newAddress) {
      const userId = rootState.Auth.user.id;
      await this.$api.addresses.post({ ...newAddress, userId });
      const addressesData = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          value: addressesToClientAdapter(
            addressesData.filter((address) => address.userId === userId)
          ),
        },
        { root: true }
      );
    },
    async deleteAddress({ commit, rootState }, addressId) {
      const userId = rootState.Auth.user.id;
      await this.$api.addresses.delete(addressId);
      const addressesData = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          value: addressesToClientAdapter(
            addressesData.filter((address) => address.userId === userId)
          ),
        },
        { root: true }
      );
    },
    async updateAddress({ commit, rootState }, address) {
      const userId = rootState.Auth.user.id;
      await this.$api.addresses.put(address);
      const addressesData = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        {
          module: "Auth",
          entity: "addresses",
          value: addressesToClientAdapter(
            addressesData.filter((address) => address.userId === userId)
          ),
        },
        { root: true }
      );
    },
  },
};
