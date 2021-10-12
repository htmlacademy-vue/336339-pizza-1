import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import Orders from "../Orders";
import OrderSection from "../components/OrderSection";

const localVue = createLocalVue();
localVue.component("OrderSection", OrderSection);

localVue.use(Vuex);

describe("Orders", () => {
  let actions;
  let store;
  let wrapper;
  let routerPush;
  let dispatch;

  const mocks = {
    $route: {
      push: routerPush,
      path: "/",
    },
    $store: {
      dispatch,
    },
  };
  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  const ordersMock = [
    {
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
  ];

  const initializeStore = () => {
    store.commit(SET_ENTITY, {
      module: "Orders",
      entity: "orders",
      value: ordersMock,
    });
  };

  beforeEach(() => {
    actions = {
      Orders: {
        repeatOrder: jest.fn(),
        deleteOrder: jest.fn(),
        query: jest.fn(),
      },
      Cart: {
        resetCart: jest.fn(),
      },
    };
    dispatch = jest.fn();
    routerPush = jest.fn();
    mocks.$router.push = routerPush;
    mocks.$store.dispatch = dispatch;
    store = generateMockStore(actions);
    initializeStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It render correct order items", async () => {
    createComponent({ localVue, store, mocks });
    const orderBlocks = wrapper.findAll('[data-test="orderSection"]');
    expect(orderBlocks.length).toBe(ordersMock.length);
  });

  it.skip("It emits an onRepeate action", async () => {
    createComponent({ localVue, store, mocks });
    const button = wrapper.find('[data-test="orderRepeateButton"]');
    await button.trigger("click");
    expect(routerPush).toHaveBeenCalled();
    expect(actions.Orders.repeatOrder).toHaveBeenCalledWith(
      expect.any(Object),
      "1"
    );
  });
  it.skip("It emits an onDelete action", async () => {
    createComponent({ localVue, store, mocks });
    const button = wrapper.find('[data-test="orderDeleteButton"]');
    await button.trigger("click");
    expect(routerPush).toHaveBeenCalled();
    expect(actions.Orders.deleteOrder).toHaveBeenCalledWith(
      expect.any(Object),
      ordersMock[0].id
    );
  });
});
