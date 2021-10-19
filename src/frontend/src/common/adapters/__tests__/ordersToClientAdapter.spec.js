import ordersToClientAdapter from "../ordersToClientAdapter";
import {
  adaptedDoughMocks,
  adaptedSaucesMocks,
  adaptedSizesMocks,
  adaptedIngredientsMocks,
  adaptedMiscMocks,
  ordersMock,
} from "@/common/mocks";

describe("ordersToClientAdapter", () => {
  it("must return a adapted orders", () => {
    expect(
      ordersToClientAdapter(
        ordersMock,
        adaptedDoughMocks,
        adaptedSaucesMocks,
        adaptedSizesMocks,
        adaptedIngredientsMocks,
        adaptedMiscMocks
      )
    ).toEqual([
      {
        id: 111,
        userId: "user111",
        addressId: 1,
        address: "Street 1, д. 2, кв. 3",
        total: 3414,
        orderPizzas: [
          {
            id: 1,
            name: "PizzaName",
            sauceId: 1,
            doughId: 2,
            sizeId: 3,
            quantity: 2,
            orderId: 111,
            dough: "На толстом тесте",
            ingredients: "Салями, Лук, Ананас",
            price: 1566,
            sauce: "Томатный",
            size: "45 см",
          },
        ],
        orderMisc: [
          {
            id: 1,
            orderId: 111,
            miscId: 1,
            quantity: 2,
            image: "/public/img/cola.svg",
            name: "Cola-Cola 0,5 литра",
            price: 56,
          },
          {
            id: 2,
            orderId: 111,
            miscId: 3,
            quantity: 1,
            image: "/public/img/potato.svg",
            name: "Картошка из печи",
            price: 170,
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
      },
    ]);
  });
});
