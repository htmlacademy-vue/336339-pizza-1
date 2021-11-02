import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import PizzasListLayout from "../PizzasListLayout";
import { cartPizzasMocks } from "@/common/mocks";
import { CounterControl } from "@/common/components";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("CounterControl", CounterControl);

describe("PizzasListLayout", () => {
  const propsData = {
    pizzas: cartPizzasMocks,
  };

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(PizzasListLayout, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render current pizza items", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.findAll('[data-test="cartPizzaItem"]').length).toBe(
      Object.keys(cartPizzasMocks).length
    );
  });

  it("is render current pizza name", () => {
    const pizzaIndex = 0;
    createComponent({ localVue, store, propsData });
    const namesBlock = wrapper.findAll('[data-test="pizzaName"]');
    expect(namesBlock.at(pizzaIndex).text()).toContain(
      cartPizzasMocks[pizzaIndex].name
    );
  });

  it("is render current pizza size and dough", () => {
    const pizzaIndex = 0;
    createComponent({ localVue, store, propsData });
    const namesBlock = wrapper.findAll('[data-test="pizzaSizeDough"]');
    expect(namesBlock.at(pizzaIndex).text()).toBe(
      `${cartPizzasMocks[pizzaIndex].size}, ${cartPizzasMocks[pizzaIndex].dough}`
    );
  });

  it("is render current pizza sauce", () => {
    const pizzaIndex = 0;
    createComponent({ localVue, store, propsData });
    const namesBlock = wrapper.findAll('[data-test="pizzaSauce"]');
    expect(namesBlock.at(pizzaIndex).text()).toBe(
      `Соус: ${cartPizzasMocks[pizzaIndex].sauce}`
    );
  });

  it("is render current pizza ingredients", () => {
    const pizzaIndex = 0;
    createComponent({ localVue, store, propsData });
    const namesBlock = wrapper.findAll('[data-test="pizzaIngredients"]');
    expect(namesBlock.at(pizzaIndex).text()).toBe(
      `Начинка: ${cartPizzasMocks[pizzaIndex].ingredients.toLowerCase()}`
    );
  });

  it("is render current pizza price", () => {
    const pizzaIndex = 0;
    createComponent({ localVue, store, propsData });
    const namesBlock = wrapper.findAll('[data-test="pizzaPrice"]');
    expect(namesBlock.at(pizzaIndex).text()).toBe(
      `${cartPizzasMocks[pizzaIndex].price} ₽`
    );
  });

  it("is emit setQuantity when click at CounterControl", async () => {
    const counterIndex = 0;
    createComponent({ localVue, store, propsData });
    const miscButtons = wrapper.findAll(".counter__button--plus");
    await miscButtons.at(counterIndex).trigger("click");
    expect(wrapper.emitted().setQuantity).toBeTruthy();
    expect(wrapper.emitted().setQuantity[0]).toStrictEqual([
      {
        id: cartPizzasMocks[counterIndex].id,
        value: cartPizzasMocks[counterIndex].quantity + 1,
      },
    ]);
  });

  it("is emit setPizzaForEdit when click at pizzaEditButton", async () => {
    const counterIndex = 0;
    createComponent({ localVue, store, propsData });
    const button = wrapper.find('[data-test="pizzaEditButton"]');
    button.trigger("click");
    expect(wrapper.emitted().setPizzaForEdit).toBeTruthy();
    expect(wrapper.emitted().setPizzaForEdit[0]).toStrictEqual([
      {
        id: cartPizzasMocks[counterIndex].id,
      },
    ]);
  });
});
