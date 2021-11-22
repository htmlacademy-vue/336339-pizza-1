import { createLocalVue, mount } from "@vue/test-utils";
import $validator from "@/common/mixins/validator";
import { generateMockStore } from "@/store/mocks";
import { AppInput } from "@/common/components";

import AddressForm from "../AddressForm";

const localVue = createLocalVue();
localVue.component("AppInput", AppInput);

describe("AddressForm", () => {
  let store;
  const ADDRESS_MOCK = {
    name: "test address name",
    street: "test street",
    building: "111",
    flat: "22",
    comment: "test Comment",
  };
  const propsData = {
    addressForEdit: null,
  };

  const mocks = {
    $validator,
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AddressForm, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render formHeader for new address", () => {
    createComponent({ localVue, propsData, mocks, store });
    expect(wrapper.find('[data-test="formHeader"]').text()).toBe("Новый адрес");
  });

  it("is render formHeader for edited address", () => {
    createComponent({
      localVue,
      propsData: { addressForEdit: ADDRESS_MOCK },
      mocks,
      store,
    });
    expect(wrapper.find('[data-test="formHeader"]').text()).toBe(
      ADDRESS_MOCK.name
    );
  });

  it("is emit onSave when click at submitButton", async () => {
    createComponent({
      localVue,
      propsData: { addressForEdit: ADDRESS_MOCK },
      mocks,
      store,
    });
    const button = wrapper.find('[data-test="saveButton"]');
    await button.trigger("submit");
    expect(wrapper.emitted().onSave).toBeTruthy();
    expect(wrapper.emitted().onSave[0]).toStrictEqual([ADDRESS_MOCK]);
  });

  it("is emit onDelete when click at onDeleteButton", async () => {
    createComponent({
      localVue,
      propsData: { addressForEdit: ADDRESS_MOCK },
      mocks,
      store,
    });
    const button = wrapper.find('[data-test="onDeleteButton"]');
    await button.trigger("click");
    expect(wrapper.emitted().onDelete).toBeTruthy();
  });

  it("is submitForm for new Address", async () => {
    createComponent({ localVue, propsData, mocks, store });
    const newAddress = {
      id: null,
      name: "new name",
      street: "new street",
      building: "333",
      flat: "1300",
      comment: "new comment",
    };
    const nameInput = wrapper.find('[data-test="addressName"]');
    nameInput.element.value = "new name";
    await nameInput.trigger("input");

    const streetInput = wrapper.find('[data-test="addressStreet"]');
    streetInput.element.value = newAddress.street;
    await streetInput.trigger("input");

    const buildingInput = wrapper.find('[data-test="addressBuilding"]');
    buildingInput.element.value = newAddress.building;
    await buildingInput.trigger("input");

    const flatInput = wrapper.find('[data-test="addressFlat"]');
    flatInput.element.value = newAddress.flat;
    await flatInput.trigger("input");

    const commentInput = wrapper.find('[data-test="addressComment"]');
    commentInput.element.value = newAddress.comment;
    await commentInput.trigger("input");

    const button = wrapper.find('[data-test="saveButton"]');
    await button.trigger("submit");
    expect(wrapper.emitted().onSave).toBeTruthy();
    // expect(wrapper.emitted().onSave[0]).toStrictEqual([newAddress]);
  });
});
