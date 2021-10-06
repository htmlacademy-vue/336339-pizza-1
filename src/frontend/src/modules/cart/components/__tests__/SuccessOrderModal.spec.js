import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import SuccessOrderModal from "../SuccessOrderModal";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("DeliveryLayout", () => {
  let routerPush;
  const propsData = {
    href: "/testUrl",
  };

  const mocks = {
    $route: {
      push: routerPush,
      path: "/",
    },
  };
  const stubs = ["router-link"];

  let store;
  let actions;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(SuccessOrderModal, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        resetCart: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    routerPush = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("it emitted when сlicked successButton", async () => {
    createComponent({
      localVue,
      store,
      propsData,
      stubs,
      mocks,
      attachTo: document.body,
    });
    const div = wrapper.find(".popup");
    await wrapper.find('[data-test="successButton"]').trigger("click");
    expect(div.classes()).toContain("animate__fadeOut");
    await div.trigger("animationend");
    expect(div.classes()).not.toContain("animate__fadeOut");
  });
});
