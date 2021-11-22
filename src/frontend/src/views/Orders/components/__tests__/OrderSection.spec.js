import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import OrderSection from "../OrderSection";
import { AppCounterControl } from "@/common/components";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppCounterControl", AppCounterControl);

describe("OrderSection", () => {
  const propsData = {
    order: {
      id: 1,
      phone: "+777 777 777",
      userId: "dc783518-cb5e-4333-ace7-3d2288381bc6",
      addressId: 1,
      orderPizzas: [
        {
          id: 1,
          name: "test",
          quantity: 1,
          sauceId: 1,
          doughId: 1,
          sizeId: 2,
          orderId: 1,
          ingredients: "Томаты, Лосось",
          price: 970,
          dough: "На тонком тесте",
          sauce: "Томатный",
          size: "32 см",
        },
      ],
      orderMisc: [
        {
          id: 1,
          name: "Cola-Cola 0,5 литра",
          image: "/public/img/cola.svg",
          price: 56,
          quantity: 2,
          orderId: 1,
          miscId: 1,
        },
        {
          id: 2,
          name: "Острый соус",
          image: "/public/img/sauce.svg",
          price: 10,
          quantity: 1,
          orderId: 1,
          miscId: 2,
        },
      ],
      orderAddress: {
        id: 1,
        name: "ул.test street, д.111, кв.22",
        street: "test street",
        building: "111",
        flat: "22",
        comment: null,
        userId: "dc783518-cb5e-4333-ace7-3d2288381bc6",
      },
      total: 1092,
      address: "test street, д. 111, кв. 22",
    },
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(OrderSection, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render correct order title", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('[data-test="orderTitle"]').text()).toBe(
      `Заказ ${propsData.order.id}`
    );
  });

  it("is render correct order sum", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('[data-test="orderSum"]').text()).toBe(
      `Сумма заказа: ${propsData.order.total} ₽`
    );
  });

  it("is emit onDelete when click at orderDeleteButton", async () => {
    createComponent({ localVue, propsData });
    const button = wrapper.find('[data-test="orderDeleteButton"]');
    await button.trigger("click");
    expect(wrapper.emitted().onDelete).toBeTruthy();
  });

  it("is emit onRepeate when click at orderRepeateButton", async () => {
    createComponent({ localVue, propsData });
    const button = wrapper.find('[data-test="orderRepeateButton"]');
    await button.trigger("click");
    expect(wrapper.emitted().onRepeate).toBeTruthy();
  });

  it("is render orderList block and correct orderItems quantity", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('[data-test="orderList"]')).toBeTruthy();
    expect(wrapper.findAll('[data-test="orderItem"]').length).toBe(
      propsData.order.orderPizzas.length
    );
  });

  it("is render correct pizzaAttributes", () => {
    const pizzaIndex = 0;
    const currentPizza = propsData.order.orderPizzas[pizzaIndex];
    createComponent({ localVue, propsData });
    const pizzaBlock = wrapper
      .findAll('[data-test="orderItem"]')
      .at(pizzaIndex);
    expect(pizzaBlock.find('[data-test="pizzaName"]').text()).toBe(
      currentPizza.name
    );
    expect(pizzaBlock.find('[data-test="pizzaSizeDough"]').text()).toBe(
      `${currentPizza.size}, ${currentPizza.dough}`
    );
    expect(pizzaBlock.find('[data-test="pizzaSauce"]').text()).toBe(
      `Соус: ${currentPizza.sauce}`
    );
    expect(pizzaBlock.find('[data-test="pizzaIngredients"]').text()).toBe(
      `Начинка: ${currentPizza.ingredients}`
    );
    expect(wrapper.find('[data-test="orderPrice"]').text()).toBe(
      `${currentPizza.price} ₽`
    );
  });

  it("is render orderList block and correct orderItems quantity", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('[data-test="orderAdditional"]')).toBeTruthy();
    expect(wrapper.findAll('[data-test="orderAdditionalItem"]').length).toBe(
      propsData.order.orderMisc.length
    );
  });

  it("is render orderAddress", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('[data-test="orderAddress"]').text()).toBe(
      `Адрес доставки: ${propsData.order.address}`
    );
  });

  it("is render symbol 'x' when misq.quantity > 1", () => {
    createComponent({ localVue, propsData });
    const firstMisc = 0;
    const secondMisc = 1;
    const firstMiscData = propsData.order.orderMisc[firstMisc];
    const secondMiscData = propsData.order.orderMisc[secondMisc];

    expect(
      wrapper.findAll('[data-test="orderMiscQuantity"]').at(firstMisc).text()
    ).toBe(`${firstMiscData.quantity}x ${firstMiscData.price} ₽`);
    expect(
      wrapper.findAll('[data-test="orderMiscQuantity"]').at(secondMisc).text()
    ).toBe(`${secondMiscData.price} ₽`);
  });
});
