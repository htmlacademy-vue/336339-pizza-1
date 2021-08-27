const calculateCostOfPizza = (
  dough,
  sauce = { price: 0 },
  ingredients,
  size = { multiplier: 1 }
) => {
  return (dough.price + sauce.price) * size.multiplier;
};
export default calculateCostOfPizza;
