import { shallowMount } from "@vue/test-utils";
import BuilderPizzaView from "../BuilderPizzaView";
import {
  adaptedSaucesMocks,
  adaptedIngredientsWithCountMocks,
  adaptedDoughMocks,
} from "@/common/mocks";

const sauceId = 1;
const doughId = 1;
const ingredientId = 1;

describe("BuilderPizzaView", () => {
  const defaultProps = {
    sauce: adaptedSaucesMocks[sauceId],
    dough: adaptedDoughMocks[doughId],
    ingredients: adaptedIngredientsWithCountMocks,
  };

  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });

  it("It renders current dough and sauce backgroundImage", () => {
    wrapper = shallowMount(BuilderPizzaView, { propsData: defaultProps });
    const backgroundImageBlock = wrapper.find(
      `.pizza--foundation--${defaultProps.dough.value}-${defaultProps.sauce.value}`
    );
    expect(backgroundImageBlock).toBeTruthy();
  });

  it("It renders current pizza without ingredients", () => {
    wrapper = shallowMount(BuilderPizzaView, { propsData: defaultProps });
    const ingredientBlocks = wrapper.findAll(".pizza__filling");
    expect(ingredientBlocks).toHaveLength(0);
  });

  it("It renders current pizza with one ingredient, the quantity of which is 1", () => {
    const quantity = 1;
    wrapper = shallowMount(BuilderPizzaView, {
      propsData: {
        ...defaultProps,
        ingredients: {
          [ingredientId]: {
            ...defaultProps.ingredients[ingredientId],
            quantity: quantity,
          },
        },
      },
    });
    const ingredientBlocks = wrapper.findAll(".pizza__filling");
    expect(ingredientBlocks).toHaveLength(quantity);
  });

  it("It renders current pizza with one ingredient, the quantity of which is 2", () => {
    const quantity = 2;
    wrapper = shallowMount(BuilderPizzaView, {
      propsData: {
        ...defaultProps,
        ingredients: {
          [ingredientId]: {
            ...defaultProps.ingredients[ingredientId],
            quantity: quantity,
          },
        },
      },
    });
    const ingredientBlocks = wrapper.findAll(".pizza__filling");
    expect(ingredientBlocks).toHaveLength(quantity);
    expect(wrapper.find(".pizza__filling--second")).toBeTruthy();
  });

  it("It renders current pizza with one ingredient, the quantity of which is 3", () => {
    const quantity = 3;
    wrapper = shallowMount(BuilderPizzaView, {
      propsData: {
        ...defaultProps,
        ingredients: {
          [ingredientId]: {
            ...defaultProps.ingredients[ingredientId],
            quantity: quantity,
          },
        },
      },
    });
    const ingredientBlocks = wrapper.findAll(".pizza__filling");
    expect(ingredientBlocks).toHaveLength(quantity);
    expect(wrapper.find(".pizza__filling--second")).toBeTruthy();
    expect(wrapper.find(".pizza__filling--third")).toBeTruthy();
  });
});
