import miscToClientAdapter from "../miscToClientAdapter";
import { miscMocks } from "@/common/mocks";

describe("miscToClientAdapter", () => {
  it("must return a adapted misc", () => {
    expect(miscToClientAdapter(miscMocks)).toEqual({
      1: {
        id: 1,
        name: "Cola-Cola 0,5 литра",
        image: "/public/img/cola.svg",
        price: 56,
        quantity: 0,
      },
      2: {
        id: 2,
        name: "Острый соус",
        image: "/public/img/sauce.svg",
        price: 10,
        quantity: 0,
      },
      3: {
        id: 3,
        name: "Картошка из печи",
        image: "/public/img/potato.svg",
        price: 170,
        quantity: 0,
      },
    });
  });
});
