import { mount } from "@vue/test-utils";
import NewRent from "@/components/RentingComponents/NewRent.vue";
import axios from "axios";

jest.mock("axios");
let mockRouter;

describe("Confirm and send a rent request", () => {
  mockRouter = {
    go: jest.fn(),
  };

  let wrapper;
  beforeEach(() => {
    wrapper = mount(NewRent, {
      props: {
        newRentBox: {
          title: "Telt",
          listingID: 1,
          fromTime: "2022-09-19",
          toTime: "2022-09-23",
          price: 200,
          renterId: 1,
          isAccepted: false,
        },
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  it("Is instansiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Check that fields show correct informations", () => {
    expect(wrapper.find("#rentTitle").text()).toEqual("Telt");
    expect(wrapper.find("#fromTime").text()).toMatch("19. September 2022");
    expect(wrapper.find("#toTime").text()).toMatch("23. September 2022");
    expect(wrapper.find("#price").text()).toEqual("Totaltpris: 200 kr");
  });

  it("Check that clicking rent sends post request", async () => {
    const button = wrapper.find("#confirmButton");
    axios.post.mockResolvedValueOnce();
    button.trigger("click");
    await wrapper.vm.$nextTick();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it("Checks that page is reloaded when cancelButton is press", async () => {
    const button = wrapper.find("#cancelButton");
    button.trigger("click");
    await wrapper.vm.$nextTick();
    expect(mockRouter.go).toHaveBeenCalledTimes(1);
    expect(mockRouter.go).toHaveBeenCalledWith(0);
  });
});
