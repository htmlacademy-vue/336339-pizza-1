import { shallowMount } from "@vue/test-utils";
import BuilderSizeSelector from "../BuilderSizeSelector";
import { adaptedSizesMocks } from "@/common/mocks";

const valueId = 1;

describe("BuilderSizeSelector", () => {
  const defaultProps = {
    sizes: adaptedSizesMocks,
    valueId,
  };

  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });
  const mockSizesLength = Object.keys(defaultProps.sizes).length;

  it("It renders all sauces inputs", () => {
    wrapper = shallowMount(BuilderSizeSelector, { propsData: defaultProps });
    const doughInputs = wrapper.findAll(".diameter__input");
    expect(doughInputs).toHaveLength(mockSizesLength);
  });

  it("It renders current checked sauceInput", () => {
    wrapper = shallowMount(BuilderSizeSelector, { propsData: defaultProps });
    const checkedInput = wrapper.find(".diameter__input input:checked");
    expect(+checkedInput.attributes("value")).toBe(valueId);
  });
  it("It emits an input event when checked dough", async () => {
    wrapper = shallowMount(BuilderSizeSelector, { propsData: defaultProps });
    let radio = wrapper.find(".diameter__input input");
    await radio.trigger("input");
    expect(wrapper.emitted().setSize).toBeTruthy();
  });
});
