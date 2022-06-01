import { shallowMount } from "@vue/test-utils";
import ChatProfile from "@/components/ChatComponents/ChatProfile.vue";

describe("ChatProfile.vue", () => {
  let wrapper;
  const props = {
    conversation: {
      recipient: {
        userId: 1,
        firstName: "Test",
        lastName: "Testersen",
        picture: "www.google.com",
      },
      lastMessage: {
        id: 0,
        content: "Hello",
        timestamp: new Date(),
        from: 0,
        to: 0,
      },
    },
  };
  beforeEach(() => {
    wrapper = shallowMount(ChatProfile, {
      propsData: props,
    });
  });

  it("Is instansiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Test that selecting the user works", () => {
    wrapper.find("a").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("recipient");
  });

  it("Test that last message renders", () => {
    // Check that all information is rendered
    expect(wrapper.findAll("span").length).toBe(3);
    expect(wrapper.findAll("span")[0].text()).toBe("Test Testersen");
    expect(wrapper.findAll("span")[1].text()).toBe("Just now");
    expect(wrapper.findAll("span")[2].text()).toBe("Hello");
  });

  it("Test that timestamp changes message", async () => {
    expect(wrapper.findAll("span")[1].text()).toBe("Just now");

    // update wrapper with a new instance and add 30 min to timestamp
    const updatedProps = props;
    let times = [
      { value: 30 * 60 * 1000, expected: "30 minutes ago" },
      { value: 60 * 60 * 1000, expected: "1 hours ago" },
      { value: 24 * 60 * 60 * 1000, expected: "1 days ago" },
      { value: 30 * 24 * 60 * 60 * 1000, expected: "1 months ago" },
      { value: 365 * 24 * 60 * 60 * 1000, expected: "1 years ago" },
    ];
    for (let i = 0; i < times.length; i++) {
      updatedProps.conversation.lastMessage.timestamp =
        Date.now() - times[i].value;
      const newWrapper = shallowMount(ChatProfile, {
        propsData: updatedProps,
      });
      expect(newWrapper.exists()).toBeTruthy();
      expect(newWrapper.findAll("span")[1].text()).toBe(times[i].expected);
    }
  });
});
