import { shallowMount } from "@vue/test-utils";
import CounterControl from "../CounterControl";

describe("CounterControl", () => {
  const defaultProps = {
    value: 0,
    maxValue: 3,
    id: "",
  };

  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets initial value", () => {
    wrapper = shallowMount(CounterControl, { propsData: defaultProps });
    expect(+wrapper.find("input").element.value).toBe(defaultProps.value);
  });
  it("It disable decrement button when value === 0", () => {
    wrapper = shallowMount(CounterControl, { propsData: defaultProps });
    expect(wrapper.find(".counter__button--minus").element.disabled).toBe(true);
  });
  it("It disable increment button when value === maxValue", () => {
    wrapper = shallowMount(CounterControl, {
      propsData: { ...defaultProps, value: 3 },
    });
    expect(wrapper.find(".counter__button--plus").element.disabled).toBe(true);
  });

  it("It emits an decrement button event when click", async () => {
    wrapper = shallowMount(CounterControl, {
      propsData: { ...defaultProps, value: 1 },
    });
    let button = wrapper.find(".counter__button--minus");
    await button.trigger("click");
    expect(wrapper.emitted().onChange).toBeTruthy();
  });

  it("It emits an increment button event when click", async () => {
    wrapper = shallowMount(CounterControl, {
      propsData: defaultProps,
    });
    let button = wrapper.find(".counter__button--plus");
    await button.trigger("click");
    expect(wrapper.emitted().onChange).toBeTruthy();
  });
});
