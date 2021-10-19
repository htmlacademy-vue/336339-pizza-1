import { shallowMount } from "@vue/test-utils";
import Main from "../Main";

const stubs = ["router-view"];

describe("Main", () => {
  it("is rendered", () => {
    const wrapper = shallowMount(Main, { stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});
