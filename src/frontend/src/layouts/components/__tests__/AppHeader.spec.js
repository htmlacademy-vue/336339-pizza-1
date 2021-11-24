import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import AppHeader from "../AppHeader";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppHeader", () => {
  let routerPush;
  const directives = {
    clickOutside: jest.fn(),
  };

  const mocks = {
    $route: {
      push: routerPush,
      path: "/",
    },
    $notifier: {
      success: jest.fn(),
    },
  };

  const propsData = {
    user: {},
    isAuthenticated: false,
    cartTotal: 0,
  };

  const stubs = ["router-link"];

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn(),
      },
    };
    routerPush = jest.fn();
    directives.clickOutside = jest.fn();
    mocks.$notifier.success = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({
      localVue,
      store,
      mocks,
      stubs,
      propsData,
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is render current cartTotal===100", () => {
    createComponent({
      localVue,
      store,
      mocks,
      stubs,
      propsData: { ...propsData, cartTotal: 100 },
    });
    expect(wrapper.find(".header__cart").text()).toContain("100 ₽");
  });

  it("is render userBlock for authenticated user", () => {
    createComponent({
      localVue,
      store,
      mocks,
      stubs,
      propsData: {
        ...propsData,
        user: { name: "Tom Riddle" },
        isAuthenticated: true,
      },
    });
    const userBlock = wrapper.find('[data-test="user-block"]');
    expect(userBlock.exists()).toBeTruthy();
    expect(userBlock.text()).toBe("Tom Riddle");
  });

  it("It emits an logout button event when click", async () => {
    createComponent({
      localVue,
      store,
      mocks,
      stubs,
      propsData: {
        ...propsData,
        user: { name: "Tom Riddle" },
        isAuthenticated: true,
      },
    });
    let button = wrapper.find(".header__logout");
    await button.trigger("click");
    expect(wrapper.emitted().logout).toBeTruthy();
  });

  it("is render login button for notAuthenticated user", () => {
    createComponent({
      localVue,
      store,
      mocks,
      stubs,
      propsData,
    });
    const userBlock = wrapper.find('[data-test="user-block"]');
    expect(userBlock.exists()).toBeFalsy();
    const loginBlock = wrapper.find(".header__login");
    expect(loginBlock.exists()).toBeTruthy();
  });
});
