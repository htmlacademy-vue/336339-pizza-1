const calculateCostOfPizza = (dough, sauce, ingredients, size) => {
  return (dough.price + sauce.price) * size.multiplier;
};
export default calculateCostOfPizza;
