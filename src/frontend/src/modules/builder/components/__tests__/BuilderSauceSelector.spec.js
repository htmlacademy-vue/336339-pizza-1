import { shallowMount } from "@vue/test-utils";
import BuilderSauceSelector from "../BuilderSauceSelector";
import { adaptedSaucesMocks } from "@/common/mocks";

const valueId = 1;

describe("BuilderSauceSelector", () => {
  const defaultProps = {
    sauces: adaptedSaucesMocks,
    valueId,
  };

  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });
  const mockSaucesLength = Object.keys(defaultProps.sauces).length;

  it("It renders all sauces inputs", () => {
    wrapper = shallowMount(BuilderSauceSelector, { propsData: defaultProps });
    const doughInputs = wrapper.findAll(".ingredients__input");
    expect(doughInputs).toHaveLength(mockSaucesLength);
  });

  it("It renders current checked sauceInput", () => {
    wrapper = shallowMount(BuilderSauceSelector, { propsData: defaultProps });
    const checkedInput = wrapper.find(".ingredients__input input:checked");
    expect(+checkedInput.attributes("value")).toBe(valueId);
  });
  it("It emits an input event when checked dough", async () => {
    wrapper = shallowMount(BuilderSauceSelector, { propsData: defaultProps });
    let radio = wrapper.find(".ingredients__input input");
    await radio.trigger("input");
    expect(wrapper.emitted().setSauce).toBeTruthy();
  });
});
