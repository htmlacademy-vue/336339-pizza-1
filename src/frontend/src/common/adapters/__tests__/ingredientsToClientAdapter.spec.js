import ingredientsToClientAdapter from "../ingredientsToClientAdapter";
import { ingredientsMocks } from "@/common/mocks";

describe("ingredientsToClientAdapter", () => {
  it("must return a adapted ingredients", () => {
    expect(ingredientsToClientAdapter(ingredientsMocks)).toEqual({
      1: {
        id: 1,
        name: "Грибы",
        image: "/public/img/filling/mushrooms.svg",
        price: 33,
        label: "mushrooms",
      },
      2: {
        id: 2,
        name: "Чеддер",
        image: "/public/img/filling/cheddar.svg",
        price: 42,
        label: "cheddar",
      },
      3: {
        id: 3,
        name: "Салями",
        image: "/public/img/filling/salami.svg",
        price: 42,
        label: "salami",
      },
      4: {
        id: 4,
        name: "Ветчина",
        image: "/public/img/filling/ham.svg",
        price: 42,
        label: "ham",
      },
      5: {
        id: 5,
        name: "Ананас",
        image: "/public/img/filling/ananas.svg",
        price: 25,
        label: "ananas",
      },
      6: {
        id: 6,
        name: "Бекон",
        image: "/public/img/filling/bacon.svg",
        price: 42,
        label: "bacon",
      },
      7: {
        id: 7,
        name: "Лук",
        image: "/public/img/filling/onion.svg",
        price: 21,
        label: "onion",
      },
      8: {
        id: 8,
        name: "Чили",
        image: "/public/img/filling/chile.svg",
        price: 21,
        label: "chile",
      },
      9: {
        id: 9,
        name: "Халапеньо",
        image: "/public/img/filling/jalapeno.svg",
        price: 25,
        label: "jalapeno",
      },
      10: {
        id: 10,
        name: "Маслины",
        image: "/public/img/filling/olives.svg",
        price: 25,
        label: "olives",
      },
      11: {
        id: 11,
        name: "Томаты",
        image: "/public/img/filling/tomatoes.svg",
        price: 35,
        label: "tomatoes",
      },
      12: {
        id: 12,
        name: "Лосось",
        image: "/public/img/filling/salmon.svg",
        price: 50,
        label: "salmon",
      },
      13: {
        id: 13,
        name: "Моцарелла",
        image: "/public/img/filling/mozzarella.svg",
        price: 35,
        label: "mozzarella",
      },
      14: {
        id: 14,
        name: "Пармезан",
        image: "/public/img/filling/parmesan.svg",
        price: 35,
        label: "parmesan",
      },
      15: {
        id: 15,
        name: "Блю чиз",
        image: "/public/img/filling/blue_cheese.svg",
        price: 50,
        label: "blue_cheese",
      },
    });
  });
});
