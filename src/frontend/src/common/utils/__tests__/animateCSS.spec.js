import { mount } from "@vue/test-utils";
import { animateCSS } from "@/common/utils";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

xdescribe("animateCSS", () => {
  it("must add the animations classes and remove them automatically", async () => {
    const mockFn = jest.fn();
    const WrapperComponent = {
      template: `
  <div class="wrapper">
  <div class="testDiv" v-if="isVisible">testDiv</div>
  <button @click="handleClick"/>
  </div>
  `,
      data() {
        return {
          isVisible: true,
        };
      },
      methods: {
        handleClick() {
          animateCSS(".testDiv", "fadeOut").then(() => {
            this.isVisible = false;
            mockFn();
          });
        },
      },
    };
    const wrapper = mount(WrapperComponent, { attachTo: document.body });
    let button = wrapper.find("button");
    await button.trigger("click");
    const div = wrapper.find(".testDiv");
    expect(div.classes()).toContain("animate__fadeOut");
    await sleep(5000);
    expect(div.classes()).not.toContain("animate__fadeOut");
    expect(mockFn).toHaveBeenCalled();
  }, 8000);
});
