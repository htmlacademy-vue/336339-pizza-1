<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          class="dough__input"
          :class="`dough__input--${doughItem.value}`"
          v-for="doughItem in dough"
          :key="doughItem.id"
        >
          <input
            type="radio"
            name="dough"
            :value="doughItem.id"
            class="visually-hidden"
            :checked="doughItem.id == valueId"
            @input="$emit('setDough', $event.target.value)"
          />
          <b>{{ doughItem.name }}</b>
          <span>{{ doughItem.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
  props: {
    dough: {
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
