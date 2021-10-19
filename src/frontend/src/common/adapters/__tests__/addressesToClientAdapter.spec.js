import addressesToClientAdapter from "../addressesToClientAdapter";
import { addressesMock } from "@/common/mocks";

describe("addressesToClientAdapter", () => {
  it("must return a adapted addresses", () => {
    expect(addressesToClientAdapter(addressesMock)).toEqual({
      1: {
        id: 1,
        name: "Дом",
        street: "Street 1",
        building: "Building 1",
        flat: "201",
      },
      2: {
        id: 2,
        name: "Офис",
        street: "Street 2",
        building: "Building 2",
        flat: "3",
      },
    });
  });
});
