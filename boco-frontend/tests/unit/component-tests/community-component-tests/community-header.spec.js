import { mount } from "@vue/test-utils";
import CommunityHeader from "@/components/CommunityComponents/CommunityHeader.vue";
import { route, router, $route, $router } from "../../mock-router";

describe("CommunityHeader component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CommunityHeader, {
      //passing prop to component
      props: {
        adminStatus: true,
        community: {
          communityId: 1,
          name: "String",
          description: "String",
          visibility: 0,
          location: "String",
          picture: "String",
        },
      },
      global: {
        mocks: {
          route,
          router,
          $route,
          $router,
        },
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
