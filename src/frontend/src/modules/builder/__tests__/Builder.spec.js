import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import Builder from "../Builder";
import {
  BuilderDoughSelector,
  BuilderSizeSelector,
  BuilderSauceSelector,
  BuilderIngredientsSelector,
  BuilderPizzaView,
} from "../components";
import {
  adaptedDoughMocks,
  adaptedIngredientsMocks,
  adaptedSaucesMocks,
  adaptedSizesMocks,
} from "@/common/mocks";
import {
  DEFAULT_DOUGH_ID,
  DEFAULT_SAUCE_ID,
  DEFAULT_SIZE_ID,
} from "@/common/constants";

const INIT_PIZZA_STATE = {
  name: "",
  quantity: 1,
  doughId: DEFAULT_DOUGH_ID,
  sizeId: DEFAULT_SIZE_ID,
  sauceId: DEFAULT_SAUCE_ID,
  ingredients: {},
};

const localVue = createLocalVue();
localVue.component("BuilderDoughSelector", BuilderDoughSelector);
localVue.component("BuilderSizeSelector", BuilderSizeSelector);
localVue.component("BuilderSauceSelector", BuilderSauceSelector);
localVue.component("BuilderIngredientsSelector", BuilderIngredientsSelector);
localVue.component("BuilderPizzaView", BuilderPizzaView);

localVue.use(Vuex);

describe("Builder", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Builder, options);
  };

  const initializeStore = () => {
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
    store.commit(SET_ENTITY, {
      module: "Builder",
      entity: "pizza",
      value: INIT_PIZZA_STATE,
    });
  };

  beforeEach(() => {
    actions = {
      Builder: {
        putDough: jest.fn(),
        putSize: jest.fn(),
        putSauce: jest.fn(),
        putName: jest.fn(),
        putIngredient: jest.fn(),
        post: jest.fn(),
        resetBuilder: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    initializeStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("it render correctPizzaPrice", () => {
    createComponent({ localVue, store });
    let element = wrapper.find(".content__result p");
    expect(element.element.innerHTML).toBe(`Итого: 700 ₽`);
  });

  it("it disable orderButton when pizzaIngredients.length === 0 or name.length of pizza === 0", () => {
    createComponent({ localVue, store });
    let button = wrapper.find(".content__result button");
    expect(button.attributes("disabled")).toBe("disabled");
  });

  it("it not disable orderButton when name.length of pizza > 0 && pizzaIngredients.length > 0", async () => {
    createComponent({ localVue, store });
    await store.commit(SET_ENTITY, {
      module: "Builder",
      entity: "pizza",
      value: {
        ...INIT_PIZZA_STATE,
        name: "testName",
        ingredients: { 11: 1, 12: 2 },
      },
    });
    let button = wrapper.find(".content__result button");
    expect(button.attributes("disabled")).toBe(undefined);
  });

  it("it current render pizzaName at input", async () => {
    createComponent({ localVue, store });
    const name = "test pizza name";
    await store.commit(SET_ENTITY, {
      module: "Builder",
      entity: "pizza",
      value: { ...INIT_PIZZA_STATE, name: name },
    });
    const nameInput = wrapper.find('input[name="pizza_name"]');
    expect(nameInput.element.value).toBe(name);
  });

  it("It emits an pizzaName input event when typing", async () => {
    createComponent({ localVue, store });
    const name = "test pizza name";
    const nameInput = wrapper.find('input[name="pizza_name"]');
    nameInput.element.value = name;
    await nameInput.trigger("input");
    expect(actions.Builder.putName).toHaveBeenCalledWith(
      expect.any(Object),
      name
    );
    expect(nameInput.element.value).toBe(name);
  });

  it("It emits an putDough action", async () => {
    createComponent({ localVue, store });
    let doughInput = wrapper.find(".dough__input input");
    await doughInput.trigger("input");
    expect(actions.Builder.putDough).toHaveBeenCalledWith(
      expect.any(Object),
      "1"
    );
  });

  it("It emits an putSize action", async () => {
    createComponent({ localVue, store });
    let sizeInput = wrapper.find(".diameter__input input");
    await sizeInput.trigger("input");

    expect(actions.Builder.putSize).toHaveBeenCalledWith(
      expect.any(Object),
      "1"
    );
  });

  it("It emits an putSauce action", async () => {
    createComponent({ localVue, store });
    let sauceInput = wrapper.find(".ingredients__input input");
    await sauceInput.trigger("input");
    expect(actions.Builder.putSauce).toHaveBeenCalledWith(
      expect.any(Object),
      "1"
    );
  });

  it("It emits an putIngredient action", async () => {
    createComponent({ localVue, store });
    let ingredientInput = wrapper.find(".ingredients__counter");
    await ingredientInput.find('[data-test="counter-plus"]').trigger("click");
    expect(actions.Builder.putIngredient).toHaveBeenCalledWith(
      expect.any(Object),
      { id: 1, value: 1 }
    );
  });

  it("It emits an post action when click on addPizza button", async () => {
    createComponent({ localVue, store });
    await store.commit(SET_ENTITY, {
      module: "Builder",
      entity: "pizza",
      value: {
        ...INIT_PIZZA_STATE,
        name: "testName",
        ingredients: { 11: 1, 12: 2 },
      },
    });
    let button = wrapper.find(".content__result button");
    await button.trigger("click");
    expect(actions.Builder.post).toHaveBeenCalled();
  });
});
