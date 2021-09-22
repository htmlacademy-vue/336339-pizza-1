import calculateCostOfPizza from "../calculateCostOfPizza";
import {
  adaptedDoughMocks,
  adaptedSaucesMocks,
  adaptedSizesMocks,
  adaptedIngredientsMocks,
} from "@/common/mocks";

describe("calculateCostOfPizza", () => {
  const sauceId = 2;
  const doughId = 1;
  const pizzaIngredients = {
    1: 2,
    2: 1,
    4: 1,
    5: 3,
  };
  it("calculate the correct cost of pizza with sizeMultiplication = 1", () => {
    const sizeId = 1;
    expect(
      calculateCostOfPizza(
        adaptedDoughMocks[doughId],
        adaptedSaucesMocks[sauceId],
        adaptedSizesMocks[sizeId],
        pizzaIngredients,
        adaptedIngredientsMocks
      )
    ).toEqual(575);
  });
  it("calculate the correct cost of pizza with sizeMultiplication = 1", () => {
    const sizeId = 2;
    expect(
      calculateCostOfPizza(
        adaptedDoughMocks[doughId],
        adaptedSaucesMocks[sauceId],
        adaptedSizesMocks[sizeId],
        pizzaIngredients,
        adaptedIngredientsMocks
      )
    ).toEqual(1150);
  });
});
