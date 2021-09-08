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
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>
    <AddressTile
      v-for="address in addresses"
      :key="address.id"
      :address="address"
      @onClick="setEditedAddress"
    />
    <AddressForm
      :addressForEdit="addresses[addressForEditId]"
      v-if="isOpenForm"
      @onDelete="handleDeleteAddress"
      @onSave="handleSaveAddress"
    />
    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
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

export default {
  name: "Profile",
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
