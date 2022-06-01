import { mount } from "@vue/test-utils";
import ColoredButton from "@/components/BaseComponents/ColoredButton.vue";

describe("ColoredButtonComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ColoredButton, {
      //passing prop to component
      props: {
        text: "hei",
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
