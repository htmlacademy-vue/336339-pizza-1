import { shallowMount } from "@vue/test-utils";
import AppLayout from "../AppLayout";
import { AppNotifications } from "@/common/components";

const stubs = {
  AppNotifications,
};

describe("AppLayout", () => {
  let wrapper;

  const mocks = {
    $store: {
      state: {
        notifications: [],
      },
    },
    $route: {
      meta: {
        layout: "",
      },
    },
  };

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  it("is rendered", () => {
    createComponent({
      mocks,
      stubs,
    });
    expect(wrapper.exists()).toBeTruthy();
  });
});
