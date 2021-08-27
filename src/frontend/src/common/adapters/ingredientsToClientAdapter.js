import { INGREDIENTS } from "@/common/constants";

const ingredientsToClientAdapter = (ingredients = []) => {
  return ingredients.reduce((accumulator, ingredient) => {
    accumulator[ingredient.id] = {
      ...ingredient,
      label: ingredient.id ? INGREDIENTS[ingredient.id] : "",
      quantity: 0,
    };
    return accumulator;
  }, {});
};

export default ingredientsToClientAdapter;
