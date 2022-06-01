import { mount } from "@vue/test-utils";
import ResetPasswordForm from "@/components/UserAuthComponents/ResetPasswordForm.vue";

describe("ResetPasswordForm component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ResetPasswordForm);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
