<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>
    <div class="user">
      <picture>
        <source
          type="image/webp"
          srcset="
            @/assets/img/users/user5@2x.webp 1x,
            @/assets/img/users/user5@4x.webp 2x
          "
        />
        <img
          src="@/assets/img/users/user5@2x.jpg"
          srcset="@/assets/img/users/user5@4x.jpg"
          :alt="user.name"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span data-test="userName">{{ user.name }}</span>
      </div>
      <p
        class="user__phone"
        data-test="userPhone"
      >
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>
    <AddressTile
      v-for="address in addresses"
      :key="address.id"
      :address="address"
      data-test="addressTile"
      @onClick="setEditedAddress"
    />
    <AddressForm
      v-if="isOpenForm"
      :address-for-edit="addresses[addressForEditId]"
      data-test="addressForm"
      @onDelete="handleDeleteAddress"
      @onSave="handleSaveAddress"
    />
    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        data-test="addAddressButton"
        @click="handleOpenForm"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { AddressTile, AddressForm } from "./components";
import { auth, isAuthenticated } from "@/middlewares";
import { TRANSITION_ENTER_ACTIVE_CLASS } from "@/common/constants";

export default {
  name: "Profile",

  layout: "AppLayoutWithSidebar",

  middlewares: [auth, isAuthenticated],

  enterActiveClass: TRANSITION_ENTER_ACTIVE_CLASS,

  components: { AddressTile, AddressForm },

  data() {
    return {
      addressForEditId: null,
      isOpenForm: false,
    };
  },

  computed: {
    ...mapState("Auth", ["user", "addresses"]),
  },

  methods: {
    ...mapActions("Auth", ["createAddress", "updateAddress", "deleteAddress"]),

    handleOpenForm() {
      this.isOpenForm = true;
    },

    handleCloseForm() {
      this.isOpenForm = false;
      this.addressForEditId = null;
    },

    setEditedAddress(editedAddressId) {
      this.addressForEditId = editedAddressId;
      this.handleOpenForm();
    },

    handleDeleteAddress() {
      if (this.addressForEditId) {
        this.deleteAddress(this.addressForEditId);
      }
      this.handleCloseForm();
    },

    handleSaveAddress(address) {
      this.handleCloseForm();
      if (address.id) {
        this.updateAddress(address);
      } else {
        this.createAddress(address);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}

.layout__button {
  button {
    padding: 12px 23px;
  }
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: $green-400;
  }

  &:active:not(:disabled) {
    background-color: $green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }
}
</style>
