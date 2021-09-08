<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>{{ address.name }}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            @click="$emit('onClick', address.id)"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ addressString }}</p>
      <small>{{ address.comment }}</small>
    </div>
  </div>
</template>

<script>
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
      const { street, building, flat } = this.address;
      return `${street}, д. ${building}${flat ? `, кв. ${flat}` : ""}`;
    },
  },
};
</script>
