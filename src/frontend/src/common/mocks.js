import pizzaMock from "@/static/pizza.json";
import user from "@/static/user.json";
import misc from "@/static/misc.json";
import {
  doughToClientAdapter,
  ingredientsToClientAdapter,
  saucesToClientAdapter,
  sizesToClientAdapter,
  miscToClientAdapter,
  addressesToClientAdapter,
  ordersToClientAdapter,
} from "@/common/adapters";
import addresses from "@/static/addresses.json";

export const doughMocks = pizzaMock.dough;
export const adaptedDoughMocks = doughToClientAdapter(doughMocks);

export const ingredientsMocks = pizzaMock.ingredients;
export const adaptedIngredientsMocks =
  ingredientsToClientAdapter(ingredientsMocks);
export const adaptedIngredientsWithCountMocks = ingredientsToClientAdapter(
  ingredientsMocks.map((item) => ({ ...item, quantity: 0 }))
);

export const saucesMocks = pizzaMock.sauces;
export const adaptedSaucesMocks = saucesToClientAdapter(saucesMocks);

export const sizesMocks = pizzaMock.sizes;
export const adaptedSizesMocks = sizesToClientAdapter(sizesMocks);

export const userMock = user;

export const miscMocks = misc;
export const adaptedMiscMocks = miscToClientAdapter(miscMocks);

export const addressesMock = addresses;
export const adaptedAddressesMock = addressesToClientAdapter(addressesMock);

export const ordersMock = [
  {
    id: 111,
    userId: "user111",
    addressId: 1,
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
    orderMisc: [
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
  },
];

export const cartPizzasMocks = [
  {
    dough: "На тонком тесте",
    doughId: 1,
    id: "1",
    ingredients: "Грибы, Лосось",
    name: "pizza name 1",
    price: 1032,
    quantity: 1,
    sauce: "Томатный",
    sauceId: 1,
    size: "32 см",
    sizeId: 2,
  },
  {
    dough: "На толстом тесте тесте",
    doughId: 2,
    id: "2",
    ingredients: "Грибы, Лосось, Моцарелла",
    name: "pizza name 2",
    price: 1430,
    quantity: 2,
    sauce: "Сливочный",
    sauceId: 2,
    size: "32 см",
    sizeId: 2,
  },
];
export const adaptedOrdersMock = ordersToClientAdapter(
  ordersMock,
  adaptedDoughMocks,
  adaptedSaucesMocks,
  adaptedSizesMocks,
  adaptedIngredientsMocks,
  adaptedMiscMocks
);
