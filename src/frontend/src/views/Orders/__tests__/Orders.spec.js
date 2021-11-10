import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import Orders from "../Index";
import OrderSection from "../components/OrderSection";
import {
  adaptedDoughMocks,
  adaptedIngredientsMocks,
  adaptedMiscMocks,
  adaptedSaucesMocks,
  adaptedSizesMocks,
} from "@/common/mocks";

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
    $router: {
      push: routerPush,
      path: "/",
    },
    $store: {
      dispatch,
    },
    $api: {
      Orders: {
        query: () => Promise.resolve(),
      },
    },
  };
  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  const ordersMock = [
    {
      id: 2,
      phone: "+777 777 777",
      userId: "ea2af052-853e-404f-b730-83c69fbae8b9",
      addressId: 1,
      orderPizzas: [
        {
          id: 2,
          name: "test",
          quantity: 1,
          sauceId: 1,
          doughId: 1,
          sizeId: 2,
          orderId: 2,
          ingredients: [
            {
              id: 4,
              quantity: 1,
              pizzaId: 2,
              ingredientId: 2,
            },
            {
              id: 5,
              quantity: 1,
              pizzaId: 2,
              ingredientId: 4,
            },
            {
              id: 6,
              quantity: 1,
              pizzaId: 2,
              ingredientId: 14,
            },
          ],
        },
      ],
      orderMisc: [
        {
          id: 3,
          quantity: 1,
          orderId: 2,
          miscId: 1,
        },
        {
          id: 4,
          quantity: 1,
          orderId: 2,
          miscId: 2,
        },
      ],
      orderAddress: {
        id: 1,
        name: "ул.test street, д.11, кв.111",
        street: "test street",
        building: "11",
        flat: "111",
        comment: null,
        userId: "ea2af052-853e-404f-b730-83c69fbae8b9",
      },
    },
  ];

  const initializeStore = () => {
    store.commit(SET_ENTITY, {
      module: "Cart",
      entity: "misc",
      value: adaptedMiscMocks,
    });
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
    mocks.$api.Orders.query = () => Promise.resolve(ordersMock);
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

  it("It emits an onRepeate action", async () => {
    createComponent({ localVue, store, mocks });
    const button = wrapper.find('[data-test="orderRepeateButton"]');
    await button.trigger("click");
    expect(routerPush).toHaveBeenCalled();
    expect(actions.Orders.repeatOrder).toHaveBeenCalledWith(
      expect.any(Object),
      2
    );
  });
  it("It emits an onDelete action", async () => {
    createComponent({ localVue, store, mocks });
    const button = wrapper.find('[data-test="orderDeleteButton"]');
    await button.trigger("click");
    expect(actions.Orders.deleteOrder).toHaveBeenCalledWith(
      expect.any(Object),
      ordersMock[0].id
    );
  });
});
