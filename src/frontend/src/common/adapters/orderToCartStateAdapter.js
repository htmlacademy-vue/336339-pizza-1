const orderToCartStateAdapter = (order) => {
  const { orderPizzas = [], misc = {}, orderAddress, phone } = order;

  return {
    misc,
    phone,
    address: orderAddress,
    pizzas: orderPizzas.map((item) => {
      return {
        ...item,
        ingredients: item.ingredients.map((ingredient) => ({
          ingredientId: ingredient.ingredientId,
          quantity: ingredient.quantity,
        })),
      };
    }),
  };
};

export default orderToCartStateAdapter;
