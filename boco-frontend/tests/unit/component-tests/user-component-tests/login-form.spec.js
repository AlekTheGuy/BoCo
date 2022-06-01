import { mount } from "@vue/test-utils";
import LoginForm from "@/components/UserAuthComponents/LoginForm.vue";

describe("LoginForm component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LoginForm);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
