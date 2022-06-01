import { shallowMount } from "@vue/test-utils";
import LoginForm from "@/components/UserAuthComponents/LoginForm.vue";

jest.mock("@/services/user.service", () => {
  return {
    getAdminList: () => {
      return new Promise((resolve) => {
        resolve([]);
      });
    },
  };
});
jest.mock("@/utils/apiutil", () => {
  return {
    doLogin: () => {
      return new Promise((resolve) => {
        resolve({
          isLoggedIn: true,
        });
      });
    },
  };
});

describe("LoginForm component", () => {
  let wrapper;
  const mockRouter = {
    push: jest.fn(),
  };
  const mockStore = {
    commit: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallowMount(LoginForm, {
      global: {
        mocks: {
          $router: mockRouter,
          $store: mockStore,
        },
      },
    });
  });

  it("Check valid login", async () => {
    // Verify that the error message is empty
    expect(wrapper.vm.message).toBe("");
    const field = wrapper.findAll("input")[0];
    field.setValue("test@test.com");
    const field2 = wrapper.findAll("input")[1];
    field2.setValue("testtest");

    // Click on the login button
    const button = wrapper.find(".login");
    button.trigger("click");

    // wait for two ticks
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    // Check that the error message is not empty
    expect(mockRouter.push).toBeCalledTimes(1);
  });
});
