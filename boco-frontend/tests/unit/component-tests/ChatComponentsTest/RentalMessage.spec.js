import { shallowMount } from "@vue/test-utils";
import RentalMessage from "@/components/ChatComponents/RentalMessage.vue";
import axios from "axios";

jest.mock("@/utils/token-utils", () => {
  return {
    tokenHeader: () => {
      return {};
    },
    parseCurrentUser: () => {
      return { accountId: 1 };
    },
  };
});

jest.mock("@/utils/apiutil", () => {
  return {
    getItemPictures: () => {
      return new Promise((resolve) => {
        resolve([]);
      });
    },
  };
});

jest.mock("axios");

describe("RentalMessage.vue", () => {
  let wrapper;
  const mockRouter = {
    go: jest.fn(),
  };
  beforeEach(() => {
    wrapper = shallowMount(RentalMessage, {
      propsData: {
        rent: {
          rentId: 0,
          fromTime: new Date(1652733228545), // 16 May 2022
          toTime: new Date(1652833228545), // 18 May 2022
          isAccepted: false,
          listingId: 1,
          listing: {
            listingID: 1,
            title: "Test",
            description: "Test",
            pricePerDay: 100,
          },
          renterId: 0,
          message: "Hello",
          deleted: false,
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

  it("Check that dates render correct", () => {
    const text = wrapper.find(".text").findAll("p");
    expect(text[0].text()).toBe(
      "Dato: " +
        new Date(1652733228545).toLocaleDateString() +
        " - " +
        new Date(1652833228545).toLocaleDateString()
    );
  });

  it("Check that buttons render", () => {
    expect(wrapper.find(".buttons").exists()).toBeTruthy();
    expect(wrapper.find(".buttons").findAll("button").length).toBe(2);
  });

  it("Check that the price is rendered correct", () => {
    const text = wrapper.find(".text").findAll("p");
    expect(text[1].text()).toBe("Pris: " + 100 * 2 + "kr");
  });

  it("Check that message is rendered", () => {
    expect(wrapper.find(".more").find("p").text()).toBe("Hello");
  });

  it("Check accepted button click", async () => {
    const button = wrapper.find(".buttons").findAll("button")[0];
    axios.put.mockResolvedValueOnce();
    button.trigger("click");
    //Wait a tick
    await wrapper.vm.$nextTick();
    expect(axios.put).toHaveBeenCalledTimes(1);
  });

  it("Check reject button click", async () => {
    const button = wrapper.find(".buttons").findAll("button")[1];
    axios.delete.mockResolvedValueOnce();
    button.trigger("click");
    //Wait a tick
    await wrapper.vm.$nextTick();
    expect(axios.delete).toHaveBeenCalledTimes(1);
  });
});

describe("RentalMessage.vue - Accepted", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RentalMessage, {
      propsData: {
        rent: {
          rentId: 0,
          fromTime: new Date(1652733228545), // 16 May 2022
          toTime: new Date(1652833228545), // 18 May 2022
          isAccepted: true,
          listingId: 1,
          listing: {
            listingID: 1,
            title: "Test",
            description: "Test",
            pricePerDay: 100,
          },
          renterId: 1,
          message: "",
          deleted: false,
        },
      },
    });
  });

  it("Check that buttons are not rendered", () => {
    expect(wrapper.find(".buttons").exists()).toBeFalsy();
  });

  it("Check that text of last div in message is Godtatt", () => {
    const divs = wrapper.find(".message").findAll("div");
    expect(divs[divs.length - 1].text()).toBe("Godtatt");
  });
});

describe("RentalMessage.vue - Declined", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RentalMessage, {
      propsData: {
        rent: {
          rentId: 0,
          fromTime: new Date(1652733228545), // 16 May 2022
          toTime: new Date(1652833228545), // 18 May 2022
          isAccepted: false,
          listingId: 1,
          listing: {
            listingID: 1,
            title: "Test",
            description: "Test",
            pricePerDay: 100,
          },
          renterId: 1,
          message: "",
          deleted: true,
        },
      },
    });
  });

  it("Check that buttons are not rendered", () => {
    expect(wrapper.find(".buttons").exists()).toBeFalsy();
  });

  it("Check that text of last div in message is Avslått", () => {
    const divs = wrapper.find(".message").findAll("div");
    expect(divs[divs.length - 1].text()).toBe("Avslått");
  });
});
