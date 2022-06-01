import { mount } from "@vue/test-utils";
import NewItemForm from "@/components/ItemComponents/NewItemForm.vue";

describe("NewItemForm component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NewItemForm);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
