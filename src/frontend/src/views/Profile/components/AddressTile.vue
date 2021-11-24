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

<style lang="scss" scoped>
.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
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

.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("~@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}

</style>
