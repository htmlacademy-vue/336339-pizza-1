import { shallowMount } from "@vue/test-utils";
import AppEmptyLayout from "../AppEmptyLayout";

const slots = {
  default: "test",
};

describe("AppEmptyLayout", () => {
  let wrapper;
  const createComponent = () => {
    wrapper = shallowMount(AppEmptyLayout, { slots });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("it renders slot content", () => {
    createComponent();
    expect(wrapper.html()).toContain(slots.default);
  });
});
