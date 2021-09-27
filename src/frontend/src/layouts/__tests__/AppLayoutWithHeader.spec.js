import { shallowMount } from "@vue/test-utils";
import AppLayoutWithHeader from "../AppLayoutWithHeader";
import { generateMockStore } from "@/store/mocks";

const slots = {
  default: "test",
};

describe("AppLayoutWithHeader", () => {
  let wrapper;
  let store;
  const createComponent = () => {
    wrapper = shallowMount(AppLayoutWithHeader, { slots, store });
  };

  beforeEach(() => {
    store = generateMockStore();
  });

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
