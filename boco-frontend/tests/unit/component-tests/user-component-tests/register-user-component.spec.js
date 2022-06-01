import { mount } from "@vue/test-utils";
import RegisterFormComponent from "@/components/UserAuthComponents/RegisterForm";

describe("RegisterFormComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RegisterFormComponent);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders the h2 text correctly", () => {
    expect(wrapper.find("#registerLabel").text()).toBe("Opprett ny konto");
  });

  it("has a button", () => {
    expect(wrapper.exists("button")).toBe(true);
  });

  it("updates data when field is updated", async () => {
    await wrapper.find('input[data-test="firstNameTest"]').setValue("Gunnar");
    expect(wrapper.vm.firstName).toBe("Gunnar");
  });

  /*   it("button click with correct sum", () => {
    wrapper.setData({ guess: "15" });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.message).toBe("SUCCESS!");
  }); */
});
