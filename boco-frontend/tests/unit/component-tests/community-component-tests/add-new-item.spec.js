import { shallowMount } from "@vue/test-utils";
import AddNewItem from "@/components/ItemComponents/NewItemForm.vue";

describe("addNewItem elements rendering", () => {
  it("renders all labels", () => {
    const wrapper = shallowMount(AddNewItem);

    expect(wrapper.find("#titleLabel").text()).toMatch("Tittel");
    expect(wrapper.find("#priceLabel").text()).toMatch("Pris");
    expect(wrapper.find("#descriptionLabel").text()).toMatch("Beskrivelse");
    expect(wrapper.find("#imageLabel").text()).toMatch("Bilde");
  });

  it("Tests setting values of input field", async () => {
    const wrapper = shallowMount(AddNewItem);

    const titleInput = wrapper.find("#title");
    await titleInput.setValue("Dyson");
    expect(titleInput.element.value).toBe("Dyson");

    const priceInput = wrapper.find("#price");
    await priceInput.setValue(500);
    expect(priceInput.element.value).toBe("500");

    const descriptionInput = wrapper.find("#description");
    await descriptionInput.setValue("Dette er en støvsuer fra Dyson");
    expect(descriptionInput.element.value).toBe(
      "Dette er en støvsuer fra Dyson"
    );
  });
});
