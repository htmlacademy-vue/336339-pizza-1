const calculateCostOfPizza = (dough, sauce, ingredients, size) => {
  return (
    (dough.price + sauce.price + calculateCostOfIngredients(ingredients)) *
    size.multiplier
  );
};
export default calculateCostOfPizza;

function calculateCostOfIngredients(ingredients) {
  return Object.keys(ingredients).reduce((accumulator, id) => {
    return accumulator + ingredients[id].quantity * ingredients[id].price;
  }, 0);
}
