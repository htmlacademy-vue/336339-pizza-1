import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import AddressTile from "../AddressTile";
import { getAddressString } from "@/common/utils";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AddressTile", () => {
  const propsData = {
    address: {
      name: "test address name",
      street: "test street",
      building: "111",
      flat: "22",
      comment: "test Comment",
    },
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AddressTile, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render addressName", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('[data-test="addressName"]').text()).toBe(
      propsData.address.name
    );
  });

  it("is render addressString", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('[data-test="addressString"]').text()).toBe(
      getAddressString(propsData.address)
    );
  });

  it("is render comment", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.find('[data-test="addressComment"]').text()).toBe(
      propsData.address.comment
    );
  });

  it("is emit onClick when click at addressButton", async () => {
    createComponent({ localVue, propsData });
    const button = wrapper.find('[data-test="addressButton"]');
    await button.trigger("click");
    expect(wrapper.emitted().onClick).toBeTruthy();
    expect(wrapper.emitted().onClick[1]).toStrictEqual(propsData.address.id);
  });
});
