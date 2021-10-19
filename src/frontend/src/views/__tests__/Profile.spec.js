import { shallowMount } from "@vue/test-utils";
import Profile from "../Profile";

describe("Profile", () => {
  it("is rendered", () => {
    const wrapper = shallowMount(Profile);
    expect(wrapper.exists()).toBeTruthy();
  });
});
