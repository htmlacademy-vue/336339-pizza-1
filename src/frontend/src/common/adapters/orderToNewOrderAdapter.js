const orderToNewOrderAdapter = (order) => {
  const {
    userId,
    orderPizzas = [],
    orderMisc = [],
    orderAddress,
    phone,
  } = order;

  return {
    userId,
    phone,
    address: orderAddress,
    pizzas: orderPizzas.map((item) => {
      const pizza = {
        ...item,
        ingredients: item.ingredients.map((ingredient) => ({
          ingredientId: ingredient.ingredientId,
          quantity: ingredient.quantity,
        })),
      };
      delete pizza["id"];
      return pizza;
    }),
    misc: orderMisc.map((item) => ({
      miscId: item.miscId,
      quantity: item.quantity,
    })),
  };
};

export default orderToNewOrderAdapter;
