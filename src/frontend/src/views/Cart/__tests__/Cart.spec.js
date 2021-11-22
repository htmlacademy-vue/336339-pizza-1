import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import Cart from "../Index";
import {
  CartFooterView,
  PizzasListLayout,
  MiscLayout,
  DeliveryLayout,
  SuccessOrderModal,
} from "../components";
import { AppCounterControl } from "@/common/components";
import {
  adaptedDoughMocks,
  adaptedIngredientsMocks,
  adaptedMiscMocks,
  adaptedSaucesMocks,
  adaptedSizesMocks,
  addressesMock,
  userMock,
} from "@/common/mocks";

const localVue = createLocalVue();
localVue.component("CartFooterView", CartFooterView);
localVue.component("PizzasListLayout", PizzasListLayout);
localVue.component("MiscLayout", MiscLayout);
localVue.component("DeliveryLayout", DeliveryLayout);
localVue.component("SuccessOrderModal", SuccessOrderModal);
localVue.component("AppCounterControl", AppCounterControl);

localVue.use(Vuex);

const PIZZAS_MOCK = [
  {
    doughId: 1,
    id: "1",
    ingredients: [{ ingredientId: 4, quntity: 3 }],
    name: "testName",
    quantity: 2,
    sauceId: 1,
    sizeId: 2,
  },
];

describe("Builder", () => {
  let routerPush;
  let actions;
  let store;
  let wrapper;
  const mocks = {
    $router: {
      push: routerPush,
    },
  };
  const stubs = ["router-link"];

  const initializeStore = () => {
    // Auth
    store.commit(SET_ENTITY, {
      module: "Auth",
      entity: "user",
      value: userMock,
    });
    store.commit(SET_ENTITY, {
      module: "Auth",
      entity: "addresses",
      value: addressesMock,
    });
    // Cart
    store.commit(SET_ENTITY, {
      module: "Cart",
      entity: "misc",
      value: adaptedMiscMocks,
    });
    store.commit(SET_ENTITY, {
      module: "Cart",
      entity: "address",
      value: {
        building: "",
        flat: "",
        street: "",
      },
    });
    store.commit(SET_ENTITY, {
      module: "Cart",
      entity: "phone",
      value: userMock.phone,
    });
    store.commit(SET_ENTITY, {
      module: "Cart",
      entity: "pizzas",
      value: PIZZAS_MOCK,
    });
    //Builder
    store.commit(SET_ENTITY, {
      module: "Builder",
      entity: "dough",
      value: adaptedDoughMocks,
    });
    store.commit(SET_ENTITY, {
      module: "Builder",
      entity: "sauces",
      value: adaptedSaucesMocks,
    });
    store.commit(SET_ENTITY, {
      module: "Builder",
      entity: "sizes",
      value: adaptedSizesMocks,
    });
    store.commit(SET_ENTITY, {
      module: "Builder",
      entity: "ingredients",
      value: adaptedIngredientsMocks,
    });
  };

  beforeEach(() => {
    actions = {
      Cart: {
        setPizzaQuantity: jest.fn(),
        setPizzaMisc: jest.fn(),
        setAddress: jest.fn(),
        setPhone: jest.fn(),
        post: jest.fn(),
      },
      Builder: {
        resetBuilder: jest.fn(),
      },
    };
    routerPush = jest.fn();
    mocks.$router.push = routerPush;
    store = generateMockStore(actions);
    initializeStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  const createComponent = () => {
    wrapper = mount(Cart, { localVue, store, stubs, mocks });
  };

  it("is rendered", () => {
    createComponent();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is render when empty cart", async () => {
    createComponent();
    await store.commit(SET_ENTITY, {
      module: "Cart",
      entity: "pizzas",
      value: [],
    });
    expect(wrapper.find('[data-test="emptyCart"]')).toBeTruthy();
  });

  it("is render notEmpty cart", async () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find('[data-test="notEmptyCart"]')).toBeTruthy();
    expect(wrapper.find('[data-test="cartFooter"]')).toBeTruthy();
  });

  it("It emits an setPizzaQuantity action", async () => {
    createComponent();
    let counterInput = wrapper.find('[data-test="counter-plus"]');
    await counterInput.trigger("click");
    expect(actions.Cart.setPizzaQuantity).toHaveBeenCalledWith(
      expect.any(Object),
      { id: PIZZAS_MOCK[0].id, value: PIZZAS_MOCK[0].quantity + 1 }
    );
  });

  it("It emits an setPizzaForEdit action", async () => {
    createComponent();
    let counterInput = wrapper.find('[data-test="pizzaEditButton"]');
    await counterInput.trigger("click");
    expect(actions.Builder.resetBuilder).toHaveBeenCalledWith(
      expect.any(Object),
      {
        doughId: 1,
        id: "1",
        ingredients: {
          4: undefined,
        },
        name: "testName",
        quantity: 2,
        sauceId: 1,
        sizeId: 2,
      }
    );
    expect(routerPush).toHaveBeenCalled();
  });

  it("It emits an setPizzaMisc action", async () => {
    createComponent();
    const miscButton = wrapper.find(
      '[data-test="miscQuantityControl"] .counter__button--plus'
    );
    await miscButton.trigger("click");
    expect(actions.Cart.setPizzaMisc).toHaveBeenCalledWith(expect.any(Object), {
      id: 1,
      value: 1,
    });
  });

  it("It emits an setAddress action", async () => {
    const street = "test street";
    createComponent();
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    await options.at(1).setSelected();
    const input = wrapper.find('[data-test="streetInput"]');
    input.element.value = street;
    await input.trigger("input");
    expect(actions.Cart.setAddress).toHaveBeenCalledWith(expect.any(Object), {
      building: "",
      flat: "",
      street,
    });
  });

  it("It emits an setPhone action", async () => {
    createComponent();
    const input = wrapper.find('[data-test="phoneInput"]');
    await input.trigger("input");
    expect(actions.Cart.setPhone).toHaveBeenCalledWith(
      expect.any(Object),
      userMock.phone
    );
  });

  it("It handleSubmitCart when submitted", async () => {
    createComponent();
    const form = wrapper.find('[data-test="cartForm"]');
    await form.trigger("submit");
    expect(actions.Cart.post).toHaveBeenCalled();
  });

  it("show SuccessModal when submit action", async () => {
    createComponent();
    const form = wrapper.find('[data-test="cartForm"]');
    await form.trigger("submit");
    expect(wrapper.find('[data-test="successModal"]')).toBeTruthy();
  });
});
