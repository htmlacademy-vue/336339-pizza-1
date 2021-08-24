import { DOUGH_TYPES, SIZES, SAUCES, INGREDIENTS } from "@/common/constants";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    value: DOUGH_TYPES.find(({ label }) => dough.name === label)?.value,
    isChecked: dough.name === "Тонкое",
  };
};

export const normalizeSize = (pizzaSize) => {
  return {
    ...pizzaSize,
    value: pizzaSize.multiplier ? SIZES[pizzaSize.multiplier] : "",
    isChecked: pizzaSize.id === 2,
  };
};

export const normalizeSauce = (sauce) => {
  return {
    ...sauce,
    value: sauce.id ? SAUCES[sauce.id] : "",
    isChecked: sauce.id === 1,
  };
};

export const normalizeIngredient = (ingredient) => {
  return {
    ...ingredient,
    label: ingredient.id ? INGREDIENTS[ingredient.id] : "",
  };
};
