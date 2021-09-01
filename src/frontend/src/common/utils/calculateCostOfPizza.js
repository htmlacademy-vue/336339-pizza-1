const calculateCostOfPizza = (
  dough,
  sauce,
  size,
  pizzaIngredients,
  ingredients
) => {
  return (
    (dough.price +
      sauce.price +
      calculateCostOfIngredients(pizzaIngredients, ingredients)) *
    size.multiplier
  );
};
export default calculateCostOfPizza;

function calculateCostOfIngredients(pizzaIngredients, ingredients) {
  return Object.keys(pizzaIngredients).reduce((accumulator, id) => {
    return accumulator + ingredients[id].price * pizzaIngredients[id];
  }, 0);
}
