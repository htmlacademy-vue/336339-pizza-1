import { shallowMount } from "@vue/test-utils";
import AppLayoutWithSidebar from "../AppLayoutWithSidebar";
import { generateMockStore } from "@/store/mocks";

const slots = {
  default: "test",
};

describe("AppLayoutWithSidebar", () => {
  let wrapper;
  let store;
  const mocks = {
    $route: {
      path: "/",
    },
  };
  const stubs = ["router-link"];
  const createComponent = () => {
    wrapper = shallowMount(AppLayoutWithSidebar, {
      slots,
      store,
      mocks,
      stubs,
    });
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
