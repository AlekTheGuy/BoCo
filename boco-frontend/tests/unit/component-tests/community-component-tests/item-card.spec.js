import { mount } from "@vue/test-utils";
import ItemCard from "@/components/ItemComponents/ItemCard.vue";

describe("ItemCard component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ItemCard, {
      props: {
        item: {
          img: "String",
          address: "String",
          title: "String",
          pricePerDay: 0,
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
