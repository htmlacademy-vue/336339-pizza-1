<template>
  <div class="layout__address">
    <form
      class="address-form address-form--opened sheet"
      data-test="addressForm"
      @submit.prevent="handleSubmitForm"
    >
      <div class="address-form__header">
        <b data-test="formHeader">{{ formHeader }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <AppInput
            v-model="address.name"
            :value="address.name"
            data-test="addressName"
            :label="'Название адреса*'"
            type="text"
            name="name"
            placeholder="Введите название адреса"
            required
          />
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <AppInput
            v-model="address.street"
            :value="address.street"
            data-test="addressStreet"
            :label="'Улица*'"
            type="text"
            name="street"
            placeholder="Введите название улицы"
            required
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="address.building"
            :value="address.building"
            data-test="addressBuilding"
            :label="'Дом*'"
            type="text"
            name="building"
            placeholder="Введите название дома"
            required
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="address.flat"
            :value="address.flat"
            data-test="addressFlat"
            :label="'Квартира'"
            type="text"
            name="flat"
            placeholder="Введите № квартиры"
          />
        </div>
        <div class="address-form__input">
          <AppInput
            v-model="address.comment"
            :value="address.comment"
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
          data-test="onDeleteButton"
          @click="$emit('onDelete')"
        >
          Удалить
        </button>
        <button
          type="submit"
          class="button"
          data-test="saveButton"
        >
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import validator from "@/common/mixins/validator";
import { AppInput } from "@/common/components";

export default {
  name: "AddressForm",

  components: { AppInput },

  mixins: [validator],

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

<style lang="scss" scoped>
.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}
</style>
