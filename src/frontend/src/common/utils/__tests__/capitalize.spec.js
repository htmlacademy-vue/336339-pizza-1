import capitalize from "../capitalize";

describe("capitalize", () => {
  it("must return a string with a capitalized first letter", () => {
    expect(capitalize("any string")).toEqual("Any string");
  });
});
