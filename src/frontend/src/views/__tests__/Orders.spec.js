import { shallowMount } from "@vue/test-utils";
import Orders from "../Orders";

describe("Orders", () => {
  it("is rendered", () => {
    const wrapper = shallowMount(Orders);
    expect(wrapper.exists()).toBeTruthy();
  });
});
