import { mount } from "@vue/test-utils";
import FormImageDisplay from "@/components/BaseComponents/FormImageDisplay.vue";

describe("FormImageDisplay component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FormImageDisplay, {
      //passing prop to component
      props: {
        image: "http://localhost:3000/api/images/5",
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
