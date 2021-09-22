import doughToClientAdapter from "../doughToClientAdapter";
import { doughMocks } from "@/common/mocks";

describe("doughToClientAdapter", () => {
  it("must return a adapted dough", () => {
    expect(doughToClientAdapter(doughMocks)).toEqual({
      1: {
        id: 1,
        name: "Тонкое",
        image: "/public/img/dough-light.svg",
        description: "Из твердых сортов пшеницы",
        price: 300,
        longLabel: "На тонком тесте",
        value: "small",
      },
      2: {
        id: 2,
        name: "Толстое",
        image: "/public/img/dough-large.svg",
        description: "Из твердых сортов пшеницы",
        price: 300,
        longLabel: "На толстом тесте",
        value: "big",
      },
    });
  });
});
