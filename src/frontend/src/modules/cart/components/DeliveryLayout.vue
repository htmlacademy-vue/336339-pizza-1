<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <select
          name="test"
          class="select"
          @change="setCurrentDeliveryType($event.target.value)"
        >
          <option :value="mySelfConst">Заберу сам</option>
          <option :value="newAddressConst">Новый адрес</option>
          <option
            v-for="address in addresses"
            :key="address.id"
            :value="address.id"
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
          @input="setPhone"
        />
      </label>

      <div
        class="cart-form__address"
        v-if="currentDeliveryType !== mySelfConst"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :value="address.street"
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
              :value="address.building"
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
              :value="address.flat"
              @input="onChangeAddressInput('flat', $event)"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NEW_ADDRESS_DELIVERY, MYSELF_DELIVERY } from "@/common/constants";
import { mapState } from "vuex";

export default {
  name: "DeliveryLayout",
  data() {
    return {
      currentDeliveryType: MYSELF_DELIVERY,
    };
  },
  props: {
    phone: {
      type: String,
      default: () => "",
    },
    address: {
      type: Object,
      required: true,
    },
    addresses: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  computed: {
    ...mapState("Auth", ["user"]),
    isAuth() {
      return Boolean(this.user);
    },
    mySelfConst() {
      return MYSELF_DELIVERY;
    },
    newAddressConst() {
      return NEW_ADDRESS_DELIVERY;
    },
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
