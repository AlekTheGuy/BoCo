import { shallowMount } from "@vue/test-utils";
import SearchItemListComponent from "@/components/ItemComponents/SearchItemList.vue";

describe("SearchItemListComponent elements rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SearchItemListComponent);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Tests setting values of input field", async () => {
    const searchInput = wrapper.find("#searchInput");
    await searchInput.setValue("Dyson");
    expect(searchInput.element.value).toBe("Dyson");
  });
});
