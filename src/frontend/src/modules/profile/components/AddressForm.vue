<template>
  <div class="layout__address">
    <form
      class="address-form address-form--opened sheet"
      @submit.prevent="handleSubmitForm"
    >
      <div class="address-form__header">
        <b>{{ formHeader }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <Input
            :value="address.name"
            v-model="address.name"
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
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import validator from "@/common/mixins/validator";
import Input from "@/common/components/Input";

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
