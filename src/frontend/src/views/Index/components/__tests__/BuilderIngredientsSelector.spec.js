import { shallowMount } from "@vue/test-utils";
import BuilderIngredientsSelector from "../BuilderIngredientsSelector";
import { adaptedIngredientsMocks } from "@/common/mocks";
import { AppCounterControl } from "@/common/components";

const stubs = {
  AppCounterControl,
};

describe("BuilderIngredientsSelector", () => {
  const defaultProps = {
    ingredients: adaptedIngredientsMocks,
  };

  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });
  const mockIngredientsLength = Object.keys(defaultProps.ingredients).length;

  it("It renders all ingredients inputs", () => {
    wrapper = shallowMount(BuilderIngredientsSelector, {
      propsData: defaultProps,
    });
    const doughInputs = wrapper.findAll(".ingredients__item");
    expect(doughInputs).toHaveLength(mockIngredientsLength);
  });

  it("It emits an input event when clicked  ingredient", async () => {
    wrapper = shallowMount(BuilderIngredientsSelector, {
      propsData: defaultProps,
      stubs,
    });
    let ingredientInput = wrapper.find(".ingredients__counter");
    await ingredientInput.find('[data-test="counter-plus"]').trigger("click");
    expect(wrapper.emitted().setIngredient).toBeTruthy();
  });

  it("It not emits an input event when clicked decrement for empty ingredient", async () => {
    wrapper = shallowMount(BuilderIngredientsSelector, {
      propsData: defaultProps,
      stubs,
    });
    let ingredientInput = wrapper.find(".ingredients__counter");
    await ingredientInput.find('[data-test="counter-minus"]').trigger("click");
    expect(wrapper.emitted().setIngredient).toBeFalsy();
  });
});
