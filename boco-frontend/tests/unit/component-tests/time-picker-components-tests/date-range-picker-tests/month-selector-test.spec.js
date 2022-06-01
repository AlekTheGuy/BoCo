import { shallowMount } from "@vue/test-utils";
import monthSelector from "@/components/TimepickerComponents/DatepickerRange/MonthSelector.vue";

describe("MonthSelector tests", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(monthSelector, {
      propsData: {
        month: new Date(0), // 01 JAN 1970 UTC
        type: "type",
      },
    });
  });

  it("Is instansiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Check if fields show correct informations", () => {
    // Check if container exists
    expect(wrapper.find(".container-c .text"));
    const children = wrapper.find(".container-c .text").findAll("div");

    // Check if there are two children
    expect(children.length).toBe(2);

    // Check children content
    expect(children[0].text()).toBe("JAN");
    expect(children[1].text()).toBe("1970");
  });

  it("Check that changing are emitted", async () => {
    // Check that there are two buttons
    expect(wrapper.findAll(".button").length).toBe(2);

    const buttons = wrapper.findAll(".button");
    // Check that the first button goes a month back
    await buttons[0].trigger("click");
    expect(wrapper.emitted()).toHaveProperty("back");

    // Check that the second button goes a month forward
    await buttons[1].trigger("click");
    expect(wrapper.emitted()).toHaveProperty("forward");
  });
});
