const calculateCostOfPizza = (
  dough,
  sauce = { price: 0 },
  ingredients,
  size = { multiplier: 1 }
) => {
  console.log(dough);
  return (dough.price + sauce.price) * size.multiplier;
};
export default calculateCostOfPizza;
