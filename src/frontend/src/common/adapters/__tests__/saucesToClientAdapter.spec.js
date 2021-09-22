import saucesToClientAdapter from "../saucesToClientAdapter";
import { saucesMocks } from "@/common/mocks";

describe("saucesToClientAdapter", () => {
  it("must return a adapted sauces", () => {
    expect(saucesToClientAdapter(saucesMocks)).toEqual({
      1: {
        id: 1,
        name: "Томатный",
        price: 50,
        value: "tomato",
      },
      2: {
        id: 2,
        name: "Сливочный",
        price: 50,
        value: "creamy",
      },
    });
  });
});
