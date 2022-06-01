import { mount } from "@vue/test-utils";
import FooterBar from "@/components/BaseComponents/FooterBar.vue";

describe("FooterBar component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FooterBar);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
