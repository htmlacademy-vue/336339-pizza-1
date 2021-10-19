import orderToCartStateAdapter from "../orderToCartStateAdapter";

describe("orderToCartStateAdapter", () => {
  it("must return a adapted order for cart state", () => {
    const order = {
      id: 111,
      userId: "user111",
      addressId: 1,
      phone: "8911-111-11-11",
      orderPizzas: [
        {
          id: 1,
          name: "PizzaName",
          sauceId: 1,
          doughId: 2,
          sizeId: 3,
          quantity: 2,
          orderId: 111,
          ingredients: [
            {
              id: 1,
              pizzaId: 1,
              ingredientId: 3,
              quantity: 2,
            },
            {
              id: 2,
              pizzaId: 1,
              ingredientId: 7,
              quantity: 3,
            },
            {
              id: 3,
              pizzaId: 1,
              ingredientId: 5,
              quantity: 1,
            },
          ],
        },
      ],
      misc: [
        {
          id: 1,
          orderId: 111,
          miscId: 1,
          quantity: 2,
        },
        {
          id: 2,
          orderId: 111,
          miscId: 3,
          quantity: 1,
        },
      ],
      orderAddress: {
        id: 1,
        name: "Address name1",
        street: "Street 1",
        building: "2",
        flat: "3",
        comment: "Any address comment",
        userId: "user111",
      },
    };
    expect(orderToCartStateAdapter(order)).toEqual({
      address: {
        building: "2",
        comment: "Any address comment",
        flat: "3",
        id: 1,
        name: "Address name1",
        street: "Street 1",
        userId: "user111",
      },
      misc: [
        {
          id: 1,
          miscId: 1,
          orderId: 111,
          quantity: 2,
        },
        {
          id: 2,
          miscId: 3,
          orderId: 111,
          quantity: 1,
        },
      ],
      phone: "8911-111-11-11",
      pizzas: [
        {
          doughId: 2,
          id: 1,
          ingredients: [
            {
              ingredientId: 3,
              quantity: 2,
            },
            {
              ingredientId: 7,
              quantity: 3,
            },
            {
              ingredientId: 5,
              quantity: 1,
            },
          ],
          name: "PizzaName",
          orderId: 111,
          quantity: 2,
          sauceId: 1,
          sizeId: 3,
        },
      ],
    });
  });
});
