import { shallowMount } from "@vue/test-utils";
import ChatMessage from "@/components/ChatComponents/ChatMessage.vue";

jest.mock("@/utils/token-utils", () => {
  return {
    parseCurrentUser: () => {
      return { accountId: 1 };
    },
  };
});

describe("ChatMessage.vue", () => {
  let wrapper;
  jest.mock("jwt-decode", () => () => ({}));

  beforeEach(() => {
    wrapper = shallowMount(ChatMessage, {
      propsData: {
        message: {
          id: 1,
          content: "Hello",
          timestamp: new Date(),
          from: 1,
          to: 0,
        },
      },
    });
  });

  it("Is instansiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Test that message contains text", () => {
    expect(wrapper.find(".message-container").findAll("span")[0].text()).toBe(
      "Hello"
    );
  });

  it("Check that side is correct", () => {
    expect(wrapper.vm.side()).toBe("justify-start");
  });
});
