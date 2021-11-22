<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${size.value}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.id"
            class="visually-hidden"
            :checked="size.id == valueId"
            @input="$emit('setSize', $event.target.value)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderSizeSelector",

  props: {
    sizes: {
      type: Object,
      required: true,
    },
    valueId: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>
