<template>
  <div class="layout__address">
    <form
      class="address-form address-form--opened sheet"
      @submit.prevent="handleSubmitForm"
      data-test="addressForm"
    >
      <div class="address-form__header">
        <b data-test="formHeader">{{ formHeader }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <Input
            :value="address.name"
            v-model="address.name"
            data-test="addressName"
            :label="'Название адреса*'"
            type="text"
            name="name"
            placeholder="Введите название адреса"
            required
          />
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <Input
            :value="address.street"
            v-model="address.street"
            data-test="addressStreet"
            :label="'Улица*'"
            type="text"
            name="street"
            placeholder="Введите название улицы"
            required
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <Input
            :value="address.building"
            v-model="address.building"
            data-test="addressBuilding"
            :label="'Дом*'"
            type="text"
            name="building"
            placeholder="Введите название дома"
            required
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <Input
            :value="address.flat"
            v-model="address.flat"
            data-test="addressFlat"
            :label="'Квартира'"
            type="text"
            name="flat"
            placeholder="Введите № квартиры"
          />
        </div>
        <div class="address-form__input">
          <Input
            :value="address.comment"
            v-model="address.comment"
            data-test="addressComment"
            :label="'Комментарий'"
            type="text"
            name="comment"
            placeholder="Введите комментарий"
          />
        </div>
      </div>
      <div class="address-form__buttons">
        <button
          type="button"
          class="button button--transparent"
          @click="$emit('onDelete')"
          data-test="onDeleteButton"
        >
          Удалить
        </button>
        <button type="submit" class="button" data-test="saveButton">
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import validator from "@/common/mixins/validator";
import { Input } from "@/common/components";

export default {
  name: "AddressForm",
  mixins: [validator],
  components: { Input },
  props: {
    addressForEdit: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    address: {
      id: null,
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
  }),
  computed: {
    formHeader() {
      return this.addressForEdit ? this.addressForEdit.name : "Новый адрес";
    },
  },
  created() {
    if (this.addressForEdit) {
      this.address = { ...this.addressForEdit };
    }
  },
  methods: {
    handleSubmitForm() {
      this.$emit("onSave", this.address);
    },
  },
};
</script>
