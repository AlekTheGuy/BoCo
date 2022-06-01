import { mount } from "@vue/test-utils";
import CommunityList from "@/components/CommunityComponents/CommunityList.vue";

describe("CommunityList component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CommunityList, {
      props: {
        communities: [
          {
            communityId: 0,
            name: "string",
            description: "string",
            visibility: 0,
            location: "string",
            picture: "string",
          },
          {
            communityId: 0,
            name: "string",
            description: "string",
            visibility: 0,
            location: "string",
            picture: "string",
          },
        ],
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
