import { INGREDIENTS } from "@/common/constants";

const ingredientsToClientAdapter = (ingredients = []) => {
  return ingredients.reduce((accumulator, ingredient) => {
    accumulator[ingredient.id] = {
      ...ingredient,
      label: ingredient.name ? INGREDIENTS[ingredient.name.toLowerCase()] : "",
    };
    return accumulator;
  }, {});
};

export default ingredientsToClientAdapter;
