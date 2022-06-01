import { shallowMount } from "@vue/test-utils";
import CreateNewGroup from "@/components/CommunityComponents/NewCommunityForm.vue";

describe("CreateNewGroup elements rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CreateNewGroup);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("renders all labels", () => {
    expect(wrapper.find("#radioBoxLabel").text()).toMatch("Synlighet");
    expect(wrapper.find("#radioBoxOpenLabel").text()).toMatch("Åpen");
    expect(wrapper.find("#radioBoxPrivateLabel").text()).toMatch("Privat");
    expect(wrapper.find("#titleLabel").text()).toMatch("Gruppenavn");
    expect(wrapper.find("#descriptionLabel").text()).toMatch("Beskrivelse");
    expect(wrapper.find("#imageLabel").text()).toMatch("Bilde");
  });

  it("Tests setting values of input field", async () => {
    const titleInput = wrapper.find("#title");
    await titleInput.setValue("Fjellgata");
    expect(titleInput.element.value).toBe("Fjellgata");

    const descriptionInput = wrapper.find("#description");
    await descriptionInput.setValue("Dette er et borettslag");
    expect(descriptionInput.element.value).toBe("Dette er et borettslag");
  });

  it("Tests if radio box checks", async () => {
    const radioInputOpen = wrapper.find("#flexRadioOpen");
    await radioInputOpen.setChecked();
    expect(radioInputOpen.element.checked).toBeTruthy();

    const radioInputPrivate = wrapper.find("#flexRadioPrivate");
    await radioInputPrivate.setChecked();
    expect(radioInputPrivate.element.checked).toBeTruthy();
  });
});
