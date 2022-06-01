import { mount } from "@vue/test-utils";
import Rating from "@/components/UserProfileComponents/RatingComponents/Rating.vue";

describe("Rating component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Rating);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
