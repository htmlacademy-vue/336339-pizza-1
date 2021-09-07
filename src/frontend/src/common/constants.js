export const DOUGH_TYPES = [
  {
    label: "Тонкое",
    longLabel: "На тонком тесте",
    value: "small",
  },
  {
    label: "Толстое",
    longLabel: "На толстом тесте",
    value: "big",
  },
];

export const SIZES = {
  1: "small",
  2: "normal",
  3: "big",
};

export const SAUCES = {
  1: "tomato",
  2: "creamy",
};

export const INGREDIENTS = {
  грибы: "mushrooms",
  чеддер: "cheddar",
  салями: "salami",
  ветчина: "ham",
  ананас: "ananas",
  бекон: "bacon",
  лук: "onion",
  чили: "chile",
  халапеньо: "jalapeno",
  маслины: "olives",
  томаты: "tomatoes",
  лосось: "salmon",
  моцарелла: "mozzarella",
  пармезан: "parmesan",
  "блю чиз": "blue_cheese",
};

export const INGREDIENTS_MAX_QUANTITY = 3;

export const DEFAULT_DOUGH_ID = 1;
export const DEFAULT_SIZE_ID = 2;
export const DEFAULT_SAUCE_ID = 1;

export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";

export const MYSELF_DELIVERY = "myself";
export const NEW_ADDRESS_DELIVERY = "newAddress";

/* eslint-disable */
export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
/* eslint-enable */

export const KEY_CODE_ENTER = 13;
