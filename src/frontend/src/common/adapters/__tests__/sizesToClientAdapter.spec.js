import sizesToClientAdapter from "../sizesToClientAdapter";
import { sizesMocks } from "@/common/mocks";

describe("sizesToClientAdapter", () => {
  it("must return a adapted sizes", () => {
    expect(sizesToClientAdapter(sizesMocks)).toEqual({
      1: {
        id: 1,
        image: "/public/img/diameter.svg",
        multiplier: 1,
        name: "23 см",
        value: "small",
      },
      2: {
        id: 2,
        image: "/public/img/diameter.svg",
        multiplier: 2,
        name: "32 см",
        value: "normal",
      },
      3: {
        id: 3,
        image: "/public/img/diameter.svg",
        multiplier: 3,
        name: "45 см",
        value: "big",
      },
    });
  });
});
