<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <select
          name="test"
          class="select"
          data-test="deliveryTypeSelect"
          @change="setCurrentDeliveryType($event.target.value)"
        >
          <option
            :value="mySelfConst"
            :selected="currentDeliveryType === mySelfConst"
          >
            Заберу сам
          </option>
          <option
            :value="newAddressConst"
            :selected="currentDeliveryType === newAddressConst"
          >
            Новый адрес
          </option>
          <option
            v-for="address in addresses"
            :key="address.id"
            :value="address.id"
            :selected="currentDeliveryType === address.id"
          >
            {{ address.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="phone"
          data-test="phoneInput"
          @input="setPhone"
        />
      </label>

      <div
        v-if="currentDeliveryType !== mySelfConst"
        class="cart-form__address"
      >
        <span class="cart-form__label">{{ addressTitle }} :</span>
        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :value="address.street || ''"
              :disabled="Boolean(address.id)"
              required
              data-test="streetInput"
              @input="onChangeAddressInput('street', $event)"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              :value="address.building || ''"
              :disabled="Boolean(address.id)"
              required
              data-test="houseInput"
              @input="onChangeAddressInput('building', $event)"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              :value="address.flat || ''"
              :disabled="Boolean(address.id)"
              data-test="apartmentInput"
              @input="onChangeAddressInput('flat', $event)"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { NEW_ADDRESS_DELIVERY, MYSELF_DELIVERY } from "@/common/constants";

export default {
  name: "DeliveryLayout",

  props: {
    phone: {
      type: String,
      default: () => "",
    },

    address: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      currentDeliveryType: MYSELF_DELIVERY,
    };
  },

  computed: {
    ...mapState("Auth", ["user", "addresses"]),

    mySelfConst() {
      return MYSELF_DELIVERY;
    },

    newAddressConst() {
      return NEW_ADDRESS_DELIVERY;
    },

    addressTitle() {
      return this.address.id ? this.address.name : "Новый адрес";
    },
  },

  created() {
    if (!this.phone) {
      this.$emit("setPhone", this.user?.phone);
    }
    if (this.address.id) {
      this.currentDeliveryType = this.address.id;
    }
  },

  methods: {
    setCurrentDeliveryType(value) {
      this.currentDeliveryType = value;
      const existingAddress = this.addresses[value];
      this.$emit(
        "setAddress",
        existingAddress || { street: "", building: "", flat: "" }
      );
    },

    setPhone(event) {
      this.$emit("setPhone", event.target.value);
    },

    onChangeAddressInput(field, event) {
      this.$emit("setAddress", {
        ...this.address,
        [field]: event.target.value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}


.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("~@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
</style>
