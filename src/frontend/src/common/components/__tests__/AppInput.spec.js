import { shallowMount } from "@vue/test-utils";
import AppInput from "../AppInput";

describe("AppInput", () => {
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
    wrapper = shallowMount(AppInput, { propsData: defaultProps });
    expect(wrapper.find("input").element.value).toBe(defaultProps.value);
  });

  it("It emits an input event when typing", async () => {
    wrapper = shallowMount(AppInput, { propsData: defaultProps });
    let input = wrapper.find("input");
    await input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("It emits current input when typing", async () => {
    wrapper = shallowMount(AppInput, { propsData: defaultProps });
    let input = wrapper.find("input");
    input.element.value = "new test";
    await input.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual("new test");
  });

  it("AppInput name is prop name", () => {
    wrapper = shallowMount(AppInput, { propsData: defaultProps });
    expect(wrapper.find("input").attributes("name")).toBe(defaultProps.name);
  });

  it("AppInput type is prop type", () => {
    wrapper = shallowMount(AppInput, { propsData: defaultProps });
    expect(wrapper.find("input").attributes("type")).toBe(defaultProps.type);
  });

  it("AppInput placeholder is prop placeholder", () => {
    wrapper = shallowMount(AppInput, { propsData: defaultProps });
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      defaultProps.placeholder
    );
  });

  it("it contains errorText from prop errorText", () => {
    wrapper = shallowMount(AppInput, { propsData: defaultProps });
    expect(wrapper.find(".error_text").html()).toContain(
      defaultProps.errorText
    );
  });

  it("Has error class", () => {
    wrapper = shallowMount(AppInput, { propsData: defaultProps });
    expect(wrapper.find("input").attributes("class")).toContain(
      "text-field__input text-field__input--error"
    );
  });

  it("it contains label from prop label", () => {
    wrapper = shallowMount(AppInput, { propsData: defaultProps });
    expect(wrapper.find(".label").html()).toContain(defaultProps.label);
  });
});
