import { mount } from "@vue/test-utils";
import Pagination from "@/components/BaseComponents/PaginationTemplate.vue";

describe("PaginationTemplate", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Pagination, {
      //passing prop to component
      props: {
        items: [],
        currentPage: 0,
        pageSize: 4,
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
