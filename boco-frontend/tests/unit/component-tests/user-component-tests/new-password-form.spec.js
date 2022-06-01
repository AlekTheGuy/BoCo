import { mount } from "@vue/test-utils";
import NewPasswordForm from "@/components/UserAuthComponents/NewPasswordForm.vue";

describe("NewPasswordForm component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NewPasswordForm);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
