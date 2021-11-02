import { shallowMount } from "@vue/test-utils";
import BuilderDoughSelector from "../BuilderDoughSelector";
import { adaptedDoughMocks } from "@/common/mocks";

const valueId = 1;

describe("BuilderDoughSelector", () => {
  const defaultProps = {
    dough: adaptedDoughMocks,
    valueId,
  };

  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });
  const mockDoughLength = Object.keys(defaultProps.dough).length;

  it("It renders all dough inputs", () => {
    wrapper = shallowMount(BuilderDoughSelector, { propsData: defaultProps });
    const doughInputs = wrapper.findAll(".dough__input");
    expect(doughInputs).toHaveLength(mockDoughLength);
  });

  it("It renders current checked doughInput", () => {
    wrapper = shallowMount(BuilderDoughSelector, { propsData: defaultProps });
    const checkedInput = wrapper.find(".dough__input input:checked");
    expect(+checkedInput.attributes("value")).toBe(valueId);
  });

  it("It emits an input event when checked dough", async () => {
    wrapper = shallowMount(BuilderDoughSelector, { propsData: defaultProps });
    let radio = wrapper.find(".dough__input input");
    await radio.trigger("input");
    expect(wrapper.emitted().setDough).toBeTruthy();
  });
});
