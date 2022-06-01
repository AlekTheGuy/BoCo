import { shallowMount } from "@vue/test-utils";
import CalendarComponent from "@/components/TimepickerComponents/DatepickerRange/CalendarComponent.vue";

describe("CalendarComponent tests", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(CalendarComponent, {
      propsData: {
        month: new Date(1651739228545), // May 2022
        blockedDaysRange: [
          [new Date(1651739228545)], // 5 May
          [
            new Date(1652733228545), // 16 May
            new Date(1652833228545), // 18 May
          ],
        ],
      },
    });
  });

  it("Is instansiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Check that all week days are rendered", () => {
    expect(wrapper.findAll(".months").length).toBe(7);
  });

  it("Check that the correct amount of days are rendered", () => {
    // 31 days in May, 6 for start of week from last month and 5 for end of month
    expect(wrapper.find(".daysList").findAll("div").length).toBe(42);
  });

  it("Check select day works", () => {
    wrapper.find(".daysList").findAll("div")[7].find("button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("selectDate");
  });

  it("Test that selecting day outside of month does not work", () => {
    // Click on the first day, which is not in the month
    wrapper.find(".daysList").findAll("div")[0].find("button").trigger("click");
    expect(wrapper.emitted()).not.toHaveProperty("selectDate");
  });
});
