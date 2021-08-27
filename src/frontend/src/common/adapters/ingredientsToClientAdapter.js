import { INGREDIENTS } from "@/common/constants";

const ingredientsToClientAdapter = (ingredient) => {
  return {
    ...ingredient,
    label: ingredient.id ? INGREDIENTS[ingredient.id] : "",
  };
};

export default ingredientsToClientAdapter;
