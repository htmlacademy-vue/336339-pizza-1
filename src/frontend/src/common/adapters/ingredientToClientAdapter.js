import { INGREDIENTS } from "@/common/constants";

const ingredientToClientAdapter = (ingredient) => {
  return {
    ...ingredient,
    label: ingredient.id ? INGREDIENTS[ingredient.id] : "",
  };
};

export default ingredientToClientAdapter;
