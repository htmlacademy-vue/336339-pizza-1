import getAddressString from "../getAddressString";

describe("getAddressString", () => {
  it("must return a correct addressString with flat", () => {
    const address = {
      street: "Московский проспект",
      building: "111",
      flat: "111",
    };
    expect(getAddressString(address)).toEqual(
      "Московский проспект, д. 111, кв. 111"
    );
  });

  it("must return a correct addressString without flat", () => {
    const address = {
      street: "Московский проспект",
      building: "111",
    };
    expect(getAddressString(address)).toEqual("Московский проспект, д. 111");
  });
});
