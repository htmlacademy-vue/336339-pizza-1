export const DOUGH_TYPES = [
  {
    label: "Тонкое",
    value: "light",
  },
  {
    label: "Толстое",
    value: "large",
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
  1: "mushrooms",
  2: "cheddar",
  3: "salami",
  4: "ham",
  5: "ananas",
  6: "bacon",
  7: "onion",
  8: "chile",
  9: "jalapeno",
  10: "olives",
  11: "tomatoes",
  12: "salmon",
  13: "mozzarella",
  14: "parmesan",
  15: "blue_cheese",
};

export const INGREDIENTS_MAX_QUANTITY = 3;

export const DEFAULT_DOUGH_ID = 1;
export const DEFAULT_SIZE_ID = 2;
export const DEFAULT_SAUCE_ID = 1;

export const DEFAULT_PIZZA_ORDER = {
  name: "",
  dough: DEFAULT_DOUGH_ID,
  size: DEFAULT_SIZE_ID,
  sauce: DEFAULT_SAUCE_ID,
  ingredients: {},
};
