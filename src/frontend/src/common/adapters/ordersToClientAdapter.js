import { calculateCostOfPizza, getAddressString } from "@/common/utils";

const orderToClientAdapter = (
  order,
  dough,
  sauces,
  sizes,
  ingredients,
  misc
) => {
  const { orderPizzas = [], orderMisc = [], orderAddress } = order;
  const adaptedOrderPizzas = orderPizzas.map((orderPizza) => ({
    ...orderPizza,
    price: calculateCostOfPizza(
      dough[orderPizza.doughId],
      sauces[orderPizza.sauceId],
      sizes[orderPizza.sizeId],
      orderPizza.ingredients.reduce((accumulator, currentItem) => {
        accumulator[currentItem.ingredientId] = currentItem.quantity;
        return accumulator;
      }, {}),
      ingredients
    ),
    dough: dough[orderPizza.doughId].longLabel,
    sauce: sauces[orderPizza.sauceId].name,
    size: sizes[orderPizza.sizeId].name,
    ingredients: orderPizza.ingredients
      .map((item) => ingredients[item.ingredientId].name)
      .join(", "),
  }));
  return {
    ...order,
    orderPizzas: adaptedOrderPizzas,
    total: adaptedOrderPizzas.reduce((accumulator, pizza) => {
      return accumulator + pizza.price * pizza.quantity;
    }, 0),
    orderMisc: orderMisc.map((miscItem) => ({
      ...miscItem,
      ...misc[miscItem.miscId],
    })),
    address: getAddressString(orderAddress),
  };
};

const ordersToClientAdapter = (
  orders = [],
  dough,
  sauces,
  sizes,
  ingredients,
  misc
) => {
  return orders.map((order) => {
    return orderToClientAdapter(order, dough, sauces, sizes, ingredients, misc);
  });
};

export default ordersToClientAdapter;
