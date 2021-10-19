import { shallowMount } from "@vue/test-utils";
import Input from "../Input";

describe("Input", () => {
  const defaultProps = {
    value: "test",
    name: "test",
    type: "submit",
    label: "test label",
    placeholder: "test",
    errorText: "error",
    required: true,
  };

  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets initial value", () => {
    wrapper = shallowMount(Input, { propsData: defaultProps });
    expect(wrapper.find("input").element.value).toBe(defaultProps.value);
  });

  it("It emits an input event when typing", async () => {
    wrapper = shallowMount(Input, { propsData: defaultProps });
    let input = wrapper.find("input");
    await input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("It emits current input when typing", async () => {
    wrapper = shallowMount(Input, { propsData: defaultProps });
    let input = wrapper.find("input");
    input.element.value = "new test";
    await input.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual("new test");
  });

  it("Input name is prop name", () => {
    wrapper = shallowMount(Input, { propsData: defaultProps });
    expect(wrapper.find("input").attributes("name")).toBe(defaultProps.name);
  });

  it("Input type is prop type", () => {
    wrapper = shallowMount(Input, { propsData: defaultProps });
    expect(wrapper.find("input").attributes("type")).toBe(defaultProps.type);
  });

  it("Input placeholder is prop placeholder", () => {
    wrapper = shallowMount(Input, { propsData: defaultProps });
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      defaultProps.placeholder
    );
  });

  it("it contains errorText from prop errorText", () => {
    wrapper = shallowMount(Input, { propsData: defaultProps });
    expect(wrapper.find(".error_text").html()).toContain(
      defaultProps.errorText
    );
  });

  it("Has error class", () => {
    wrapper = shallowMount(Input, { propsData: defaultProps });
    expect(wrapper.find("input").attributes("class")).toContain(
      "text-field__input text-field__input--error"
    );
  });

  it("it contains label from prop label", () => {
    wrapper = shallowMount(Input, { propsData: defaultProps });
    expect(wrapper.find(".label").html()).toContain(defaultProps.label);
  });
});
