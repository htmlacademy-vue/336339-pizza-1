import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import Profile from "../Profile";
import { AddressTile, AddressForm } from "../components";
import { adaptedAddressesMock, addressesMock, userMock } from "@/common/mocks";

const localVue = createLocalVue();
localVue.component("AddressTile", AddressTile);
localVue.component("AddressForm", AddressForm);

localVue.use(Vuex);

describe("Builder", () => {
  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Profile, options);
  };

  const initializeStore = () => {
    store.commit(SET_ENTITY, {
      module: "Auth",
      entity: "user",
      value: userMock,
    });
    store.commit(SET_ENTITY, {
      module: "Auth",
      entity: "addresses",
      value: adaptedAddressesMock,
    });
  };

  beforeEach(() => {
    actions = {
      Auth: {
        createAddress: jest.fn(),
        updateAddress: jest.fn(),
        deleteAddress: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    initializeStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("it render userName", () => {
    createComponent({ localVue, store });
    let name = wrapper.find('[data-test="userName"]');
    expect(name.text()).toBe(userMock.name);
  });

  it("it render userPhone", () => {
    createComponent({ localVue, store });
    let name = wrapper.find('[data-test="userPhone"]');
    expect(name.text()).toBe(`Контактный телефон: ${userMock.phone}`);
  });

  it("it render current AddressTile`s quantity", () => {
    createComponent({ localVue, store });
    let addressTiles = wrapper.findAll('[data-test="addressTile"]');
    expect(addressTiles.length).toBe(Object.keys(addressesMock).length);
  });

  it("it emit setEditedAddress when click on AddressTile", async () => {
    createComponent({ localVue, store });
    const tileIndex = 1;
    let addressTiles = wrapper.findAll('[data-test="addressTile"]');
    let button = addressTiles.at(tileIndex).find('[data-test="addressButton"]');
    await button.trigger("click");
    expect(wrapper.vm.addressForEditId).toBe(addressesMock[tileIndex].id);
  });

  it("it render addressForm when click handleOpenForm", async () => {
    createComponent({ localVue, store });
    const formBlock = wrapper.find('[data-test="addressForm"]');
    let button = wrapper.find('[data-test="addAddressButton"]');
    await button.trigger("click");
    expect(formBlock).toBeTruthy();
  });

  it("it emit handleDeleteAddress when click onDelete button", async () => {
    const addressIndex = 1;
    const addressId = addressesMock[addressIndex].id;
    createComponent({
      localVue,
      store,
      data() {
        return {
          addressForEditId: addressId,
          isOpenForm: true,
        };
      },
    });
    const deleteButton = wrapper.find('[data-test="onDeleteButton"]');
    await deleteButton.trigger("click");
    expect(actions.Auth.deleteAddress).toHaveBeenCalledWith(
      expect.any(Object),
      addressId
    );
  });

  it("it emit updateAddress when click saveForm button", async () => {
    const addressIndex = 1;
    const addressId = addressesMock[addressIndex].id;
    createComponent({
      localVue,
      store,
      data() {
        return {
          addressForEditId: addressId,
          isOpenForm: true,
        };
      },
    });
    const saveButton = wrapper.find('[data-test="saveButton"]');
    await saveButton.trigger("submit");
    expect(actions.Auth.updateAddress).toHaveBeenCalledWith(
      expect.any(Object),
      addressesMock[addressIndex]
    );
  });

  it("it emit createAddress when click saveForm button", async () => {
    createComponent({
      localVue,
      store,
      data() {
        return {
          addressForEditId: null,
          isOpenForm: true,
        };
      },
    });
    const saveButton = wrapper.find('[data-test="saveButton"]');
    await saveButton.trigger("submit");
    expect(actions.Auth.createAddress).toHaveBeenCalled();
  });
});
