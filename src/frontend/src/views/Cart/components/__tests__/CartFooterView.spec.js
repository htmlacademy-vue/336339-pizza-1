import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import CartFooterView from "../CartFooterView";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartFooterView", () => {
  const propsData = {
    total: 0,
  };

  const stubs = ["router-link"];

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(CartFooterView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({
      localVue,
      store,
      stubs,
      propsData,
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is render current total===100", () => {
    createComponent({
      localVue,
      store,
      stubs,
      propsData: { ...propsData, total: 100 },
    });
    expect(wrapper.find('[data-test="footerTotal"]').text()).toContain(
      "Итого: 100 ₽"
    );
  });
});
