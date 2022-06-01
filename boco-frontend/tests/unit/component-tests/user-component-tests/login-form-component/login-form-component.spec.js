import { shallowMount } from "@vue/test-utils";
import LoginForm from "@/components/UserAuthComponents/LoginForm.vue";

jest.mock("@/utils/apiutil", () => {
  return {
    doLogin: () => {
      return new Promise((resolve) => {
        resolve({
          isLoggedIn: false,
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

  it("is instantiated", () => {
    console.log(wrapper.html());
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Check that two input fields are rendered", () => {
    expect(wrapper.findAll("input").length).toBe(2);
  });

  it("Insert invalid email into the first input field", () => {
    const field = wrapper.findAll("input")[0];
    field.setValue("test");
    expect(field.element.validity.valid).toBeFalsy();
  });

  it("Insert valid email into the first input field", () => {
    const field = wrapper.findAll("input")[0];
    field.setValue("test@test.com");
    expect(field.element.validity.valid).toBeTruthy();
  });

  it("Check invalid login", async () => {
    // Verify that the error message is empty
    expect(wrapper.vm.message).toBe("");
    const field = wrapper.findAll("input")[0];
    field.setValue("test@test.com");
    const field2 = wrapper.findAll("input")[1];
    field2.setValue("testtest");

    // Click on the login button
    const button = wrapper.find(".login");
    button.trigger("click");

    // wait a tick
    await wrapper.vm.$nextTick();

    // Check that the error message is not empty
    expect(wrapper.vm.message).not.toBe("");
  });
});
