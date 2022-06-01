import { mount } from "@vue/test-utils";
import CustomFooterModal from "@/components/BaseComponents/CustomFooterModal.vue";

describe("IconButtonComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CustomFooterModal, {
      //passing prop to component
      props: {
        visible: true,
        title: "String",
        message: "String",
      },
      slots: {
        default: '<div class="fake-msg">String</div>',
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
