import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import DeliveryLayout from "../DeliveryLayout";
import { MYSELF_DELIVERY } from "@/common/constants";
import { adaptedAddressesMock } from "@/common/mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("DeliveryLayout", () => {
  const propsData = {
    phone: "",
    address: { street: "", building: "", flat: "" },
  };

  const initializeStore = () => {
    store.commit(SET_ENTITY, {
      module: "Auth",
      entity: "isAuthenticated",
      value: false,
    });
    store.commit(SET_ENTITY, {
      module: "Auth",
      entity: "user",
      value: {},
    });
    store.commit(SET_ENTITY, {
      module: "Auth",
      entity: "addresses",
      value: {},
    });
  };

  let store;
  let actions;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(DeliveryLayout, options);
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
    };
    store = generateMockStore(actions);
    initializeStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is checked myself deliveryType when notAuth", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("option:checked").element.value).toBe(MYSELF_DELIVERY);
  });

  it("it render current quantity options of user addresses", async () => {
    createComponent({ localVue, store, propsData });
    await store.commit(SET_ENTITY, {
      module: "Auth",
      entity: "addresses",
      value: adaptedAddressesMock,
    });
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    expect(options.length).toBe(Object.keys(adaptedAddressesMock).length + 2);
  });

  it("it handle setCurrentDeliveryType when click on option", async () => {
    createComponent({ localVue, store, propsData });
    await store.commit(SET_ENTITY, {
      module: "Auth",
      entity: "addresses",
      value: adaptedAddressesMock,
    });
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    options.at(-1).setSelected();
    const keysOfAddresses = Object.keys(adaptedAddressesMock);
    expect(+wrapper.find("option:checked").element.value).toBe(
      adaptedAddressesMock[keysOfAddresses[keysOfAddresses.length - 1]].id
    );
  });

  it("it correct render phone value in input", async () => {
    const phone = "8911-111-11-11";
    createComponent({ localVue, store, propsData: { ...propsData, phone } });
    expect(wrapper.find('[data-test="phoneInput"]').element.value).toBe(phone);
  });

  it("it emits an phoneInput event when typing", async () => {
    createComponent({ localVue, store, propsData });
    const input = wrapper.find('[data-test="phoneInput"]');
    await input.trigger("input");
    expect(wrapper.emitted().setPhone).toBeTruthy();
  });

  it("it not display addressForm when deliveryType === myself", async () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find(".cart-form__address").exists()).toBeFalsy();
  });

  it("it correct render street value in input", async () => {
    const street = "test street";
    createComponent({
      localVue,
      store,
      propsData: { ...propsData, address: { ...propsData.address, street } },
    });
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    await options.at(1).setSelected();
    expect(wrapper.find('[data-test="streetInput"]').element.value).toBe(
      street
    );
  });

  it("it emitted when input streetInput event", async () => {
    const street = "test street";
    createComponent({
      localVue,
      store,
      propsData: { ...propsData, address: propsData },
    });
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    await options.at(1).setSelected();
    const input = wrapper.find('[data-test="streetInput"]');
    input.element.value = street;
    await input.trigger("input");
    expect(wrapper.emitted().setAddress).toBeTruthy();
    expect(wrapper.emitted().setAddress[1]).toStrictEqual([
      {
        address: { building: "", flat: "", street: "" },
        phone: "",
        street,
      },
    ]);
  });

  it("it disable street input when address has id", async () => {
    createComponent({
      localVue,
      store,
      propsData: {
        ...propsData,
        address: { ...propsData.address, id: "testId" },
      },
    });
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    await options.at(1).setSelected();
    const input = wrapper.find('[data-test="streetInput"]');
    expect(input.attributes("disabled")).toBe("disabled");
  });

  it("it correct render house value in input", async () => {
    const building = "test building";
    createComponent({
      localVue,
      store,
      propsData: { ...propsData, address: { ...propsData.address, building } },
    });
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    await options.at(1).setSelected();
    expect(wrapper.find('[data-test="houseInput"]').element.value).toBe(
      building
    );
  });

  it("it emitted when input houseInput event", async () => {
    const building = "test building";
    createComponent({
      localVue,
      store,
      propsData: { ...propsData, address: propsData },
    });
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    await options.at(1).setSelected();
    const input = wrapper.find('[data-test="houseInput"]');
    input.element.value = building;
    await input.trigger("input");
    expect(wrapper.emitted().setAddress).toBeTruthy();
    expect(wrapper.emitted().setAddress[1]).toStrictEqual([
      {
        address: { building: "", flat: "", street: "" },
        phone: "",
        building,
      },
    ]);
  });

  it("it disable house input when address has id", async () => {
    createComponent({
      localVue,
      store,
      propsData: {
        ...propsData,
        address: { ...propsData.address, id: "testId" },
      },
    });
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    await options.at(1).setSelected();
    const input = wrapper.find('[data-test="houseInput"]');
    expect(input.attributes("disabled")).toBe("disabled");
  });

  it("it correct render flat value in input", async () => {
    const flat = "test flat";
    createComponent({
      localVue,
      store,
      propsData: { ...propsData, address: { ...propsData.address, flat } },
    });
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    await options.at(1).setSelected();
    expect(wrapper.find('[data-test="apartmentInput"]').element.value).toBe(
      flat
    );
  });

  it("it emitted when input flatInput event", async () => {
    const flat = "test flat";
    createComponent({
      localVue,
      store,
      propsData: { ...propsData, address: propsData },
    });
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    await options.at(1).setSelected();
    const input = wrapper.find('[data-test="apartmentInput"]');
    input.element.value = flat;
    await input.trigger("input");
    expect(wrapper.emitted().setAddress).toBeTruthy();
    expect(wrapper.emitted().setAddress[1]).toStrictEqual([
      {
        address: { building: "", flat: "", street: "" },
        phone: "",
        flat,
      },
    ]);
  });

  it("it disable flat input when address has id", async () => {
    createComponent({
      localVue,
      store,
      propsData: {
        ...propsData,
        address: { ...propsData.address, id: "testId" },
      },
    });
    const options = wrapper
      .find('[data-test="deliveryTypeSelect"]')
      .findAll("option");
    await options.at(1).setSelected();
    const input = wrapper.find('[data-test="apartmentInput"]');
    expect(input.attributes("disabled")).toBe("disabled");
  });
});
