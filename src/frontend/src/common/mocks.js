import pizzaMock from "@/static/pizza.json";
import user from "@/static/user.json";
import misc from "@/static/misc.json";
import {
  doughToClientAdapter,
  ingredientsToClientAdapter,
  saucesToClientAdapter,
  sizesToClientAdapter,
  miscToClientAdapter,
} from "@/common/adapters";

export const doughMocks = doughToClientAdapter(pizzaMock.dough);
export const ingredientsMocks = ingredientsToClientAdapter(
  pizzaMock.ingredients
);
export const saucesMocks = saucesToClientAdapter(pizzaMock.sauces);
export const sizesMocks = sizesToClientAdapter(pizzaMock.sizes);
export const userMock = user;
export const miscMocks = miscToClientAdapter(misc);
