<template>
  <AppLayout :total="0">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

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
                  :value="dough.value"
                  class="visually-hidden"
                  :checked="doughItem.isChecked"
                />
                <b>{{ doughItem.name }}</b>
                <span>{{ doughItem.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>
            <div class="sheet__content diameter">
              <label
                class="diameter__input"
                :class="`diameter__input--${size.value}`"
                v-for="size in sizes"
                :key="size.id"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="size.value"
                  class="visually-hidden"
                  :checked="size.isChecked"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>
                <label
                  class="radio ingredients__input"
                  v-for="sauce in sauces"
                  :key="sauce.id"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="sauce.value"
                    :checked="sauce.isChecked"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul class="ingredients__list">
                  <li
                    class="ingredients__item"
                    v-for="ingredient in ingredients"
                    :key="ingredient.id"
                  >
                    <span
                      class="filling"
                      :class="`filling--${ingredient.label}`"
                      >{{ ingredient.name }}</span
                    >
                    <CounterControl
                      :value="0"
                      :max-value="3"
                      :set-value="setCounter"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </AppLayout>
</template>

<script>
import pizza from "@/static/pizza.json";
import AppLayout from "@/layouts/AppLayout";
import CounterControl from "@/common/components/CounterControl";

import {
  doughToClientAdapter,
  sizeToClientAdapter,
  sauceToClientAdapter,
  ingredientToClientAdapter,
} from "@/common/adapters";

export default {
  name: "Index",
  components: { AppLayout, CounterControl },
  data() {
    return {
      pizza,
      dough: pizza.dough.map((item) => doughToClientAdapter(item)),
      sizes: pizza.sizes.map((item) => sizeToClientAdapter(item)),
      sauces: pizza.sauces.map((item) => sauceToClientAdapter(item)),
      ingredients: pizza.ingredients.map((item) =>
        ingredientToClientAdapter(item)
      ),
    };
  },
  methods: {
    setCounter(value) {
      console.log("setCounter", value);
    },
  },
};
</script>
