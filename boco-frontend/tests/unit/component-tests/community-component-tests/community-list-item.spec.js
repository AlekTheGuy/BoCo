import { mount } from "@vue/test-utils";
import CommunityListItem from "@/components/CommunityComponents/CommunityListItem.vue";

describe("CommunityListItem component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CommunityListItem, {
      //passing prop to component
      props: {
        community: {
          communityId: 0,
          name: "string",
          description: "string",
          visibility: 0,
          location: "string",
          picture: "string",
        },
        member: false,
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
