import { shallowMount } from "@vue/test-utils";
import DateRangePicker from "@/components/TimepickerComponents/DatepickerRange/DatepickerRange.vue";

describe("DateRangePicker.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(DateRangePicker, {
      propsData: {
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

  it("Check that calendar is closed", () => {
    expect(wrapper.find(".picker").attributes().style).toBe("display: none;");
  });

  it("Click input to open calender", async () => {
    wrapper.find("input").trigger("click");
    // wait a tick
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".picker").attributes().style).toBe("display: flex;");
  });

  it("Select blocked date", async () => {
    wrapper.vm.$emit("selectDate", new Date(1651739228545));
    await wrapper.vm.$nextTick();
    // Check if startDate is set
    expect(wrapper.vm.startDate).not.toBe(new Date(1651739228545));
  });

  it("Select valid date", async () => {
    await wrapper.vm.selectDate(new Date(1661739228545));
    // wait a tick
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.startDate.getTime()).toBe(1661739228545);
  });

  it("Select valid range", async () => {
    await wrapper.vm.selectDate(new Date(1661739228545));
    await wrapper.vm.selectDate(new Date(1661939228545));

    // wait a tick
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.startDate.getTime()).toBe(1661739228545);
    expect(wrapper.vm.endDate.getTime()).toBe(1661939228545);

    // Click on the complete button to close the calendar
    wrapper.find(".buttons").findAll("button")[1].trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".picker").attributes().style).toBe("display: none;");
  });

  it("Select invalid range", async () => {
    // Check that error is not present.
    expect(wrapper.find(".error").exists()).not.toBeTruthy();

    const start = 1652433228545;
    const end = 1652933228545;

    await wrapper.vm.selectDate(new Date(start));
    await wrapper.vm.selectDate(new Date(end));
    // Ceck that present is invalid
    expect(wrapper.find(".error").exists()).toBeTruthy();
  });

  it("Check reset button", async () => {
    // Check that error is not present.
    expect(wrapper.find(".error").exists()).not.toBeTruthy();

    const start = 1652433228545;
    const end = 1652933228545;

    await wrapper.vm.selectDate(new Date(start));
    await wrapper.vm.selectDate(new Date(end));
    // Ceck that present is invalid
    expect(wrapper.find(".error").exists()).toBeTruthy();

    wrapper.find(".buttons").findAll("button")[0].trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.startDate.getTime()).not.toBe(1652433228545);
    expect(wrapper.vm.endDate).toBe(null);
  });
});
