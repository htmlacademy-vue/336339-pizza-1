const calculateCostOfPizza = (dough, sauce, size, ingredients) => {
  return (
    (dough.price + sauce.price + calculateCostOfIngredients(ingredients)) *
    size.multiplier
  );
};
export default calculateCostOfPizza;

function calculateCostOfIngredients(ingredients) {
  return Object.keys(ingredients).reduce((accumulator, id) => {
    return accumulator + ingredients[id].count * ingredients[id].price;
  }, 0);
}
