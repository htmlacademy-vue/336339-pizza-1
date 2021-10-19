import { shallowMount } from "@vue/test-utils";
import Cart from "../Cart";

describe("Cart", () => {
  it("is rendered", () => {
    const wrapper = shallowMount(Cart);
    expect(wrapper.exists()).toBeTruthy();
  });
});
