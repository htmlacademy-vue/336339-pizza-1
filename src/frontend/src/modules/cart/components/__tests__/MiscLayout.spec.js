import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import MiscLayout from "../MiscLayout";
import { adaptedMiscMocks } from "@/common/mocks";
import { CounterControl } from "@/common/components";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("CounterControl", CounterControl);

describe("MiscLayout", () => {
  const propsData = {
    misc: adaptedMiscMocks,
  };

  let store;
  let actions;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(MiscLayout, options);
  };

  beforeEach(() => {
    store = generateMockStore(actions);
    actions = {
      Cart: {
        setMisc: jest.fn(),
      },
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render current misc items", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.findAll(".additional-list__item").length).toBe(
      Object.keys(adaptedMiscMocks).length
    );
  });

  it("is render misc name", () => {
    const nameIndex = 2;
    createComponent({ localVue, store, propsData });
    const miscNames = wrapper.findAll('[data-test="miscName"]');
    expect(miscNames.at(nameIndex).text()).toContain(
      adaptedMiscMocks[nameIndex + 1].name
    );
  });

  it("is render currentValue in CounterControl", () => {
    const counterIndex = 2;
    createComponent({ localVue, store, propsData });
    const miscControls = wrapper.findAll(
      '[data-test="miscQuantityControl"] input'
    );
    expect(miscControls.at(counterIndex).element.value).toContain(
      adaptedMiscMocks[counterIndex + 1].quantity
    );
  });

  it("is emit setMisc when click at CounterControl", async () => {
    const counterIndex = 2;
    createComponent({ localVue, store, propsData });
    const miscButtons = wrapper.findAll(
      '[data-test="miscQuantityControl"] .counter__button--plus'
    );
    await miscButtons.at(counterIndex).trigger("click");
    expect(wrapper.emitted().setMisc).toBeTruthy();
    expect(wrapper.emitted().setMisc[0]).toStrictEqual([
      {
        id: adaptedMiscMocks[counterIndex + 1].id,
        value: adaptedMiscMocks[counterIndex + 1].quantity + 1,
      },
    ]);
  });

  it("is render current miscPrice", () => {
    const priceIndex = 2;
    createComponent({ localVue, store, propsData });
    const miscPrices = wrapper.findAll('[data-test="miscPrice"]');
    expect(miscPrices.at(priceIndex).html()).toContain(
      adaptedMiscMocks[priceIndex + 1].price
    );
  });
});
