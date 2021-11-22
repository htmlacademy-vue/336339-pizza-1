<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b data-test="addressName">{{ address.name }}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            data-test="addressButton"
            @click="$emit('onClick', address.id)"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p data-test="addressString">{{ addressString }}</p>
      <small data-test="addressComment">{{ address.comment }}</small>
    </div>
  </div>
</template>

<script>
import { getAddressString } from "@/common/utils";
export default {
  name: "AddressTile",

  props: {
    address: {
      type: Object,
      required: true,
    },
  },

  computed: {
    addressString() {
      return getAddressString(this.address);
    },
  },
};
</script>
