import { mount, createLocalVue } from "@vue/test-utils";
import $validator from "@/common/mixins/validator";
import { generateMockStore } from "@/store/mocks";
import { Input } from "@/common/components";
import Login from "../Login";

const localVue = createLocalVue();
localVue.component("AppInput", Input);

describe("Login", () => {
  let routerPush;
  let login;
  let getMe;
  let store;

  const actions = {
    Auth: {
      login,
      getMe,
    },
  };

  const mocks = {
    $router: {
      push: routerPush,
    },
    $validator,
  };

  const stubs = ["router-link"];

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    routerPush = jest.fn();
    login = jest.fn();
    getMe = jest.fn();
    mocks.$router.push = routerPush;
    actions.Auth.login = login;
    actions.Auth.getMe = getMe;
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("validation must be called", async () => {
    createComponent({ localVue, mocks, stubs, store });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    await wrapper.find(".button").trigger("submit");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(login).not.toHaveBeenCalled();
    expect(getMe).not.toHaveBeenCalled();
  });

  it("calls login and getMe when validate is success", async () => {
    createComponent({ localVue, mocks, stubs, store });
    const emailInput = wrapper.find('[data-test="email-input"]').find("input");
    const passwordInput = wrapper
      .find('[data-test="password-input"]')
      .find("input");

    emailInput.element.value = "user@example.com";
    await emailInput.trigger("input");
    passwordInput.element.value = "user@example.com";
    await passwordInput.trigger("input");

    await wrapper.find(".button").trigger("submit");
    expect(login).toHaveBeenCalled();
    expect(routerPush).toHaveBeenCalled();
  });
});
