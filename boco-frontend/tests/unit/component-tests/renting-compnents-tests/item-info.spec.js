import { shallowMount } from "@vue/test-utils";
import ItemInfo from "@/components/RentingComponents/ItemInfo.vue";

const mockMethod = jest.spyOn(ItemInfo.methods, "sendToConfirm");
const mockCreatePush = jest.spyOn(ItemInfo.methods, "createPushItem");

jest.mock("@/utils/apiutil", () => {
  return {
    getItem: () => {
      return new Promise((resolve) => {
        resolve({
          listingID: 0,
          title: "Title",
          description: "Description",
          pricePerDay: 100,
          address: "ABC ROAD 3",
          userID: 1,
          categoryNames: [],
          communityIDs: [],
        });
      });
    },
    getItemPictures: () => {
      return new Promise((resolve) => {
        resolve([]);
      });
    },
  };
});

describe("ItemInfo component", () => {
  let wrapper;
  const mockRouter = {
    push: jest.fn(),
    currentRoute: {
      value: {
        params: {
          id: "1",
        },
      },
    },
  };
  const mockStore = {
    commit: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallowMount(ItemInfo, {
      global: {
        mocks: {
          $router: mockRouter,
          $store: mockStore,
        },
      },
    });
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Check that title is displayed", () => {
    expect(wrapper.findAll("h1")[0].text()).toBe("Title");
  });

  it("Check that button cannot be clicked if date is not selected", async () => {
    const jestCreatePushItemMock = jest.fn();
    wrapper.vm.createPushItem = jestCreatePushItemMock;

    // Click rent button
    wrapper.find("button").trigger("click");

    // wait a tick
    await wrapper.vm.$nextTick();

    // Check that jestMock was not clicked
    expect(mockMethod).toHaveBeenCalledTimes(1);
    expect(mockCreatePush).toHaveBeenCalledTimes(0);
    // Check that the last p contains "Dato er påkrevd"
    expect(wrapper.findAll("p")[wrapper.findAll("p").length - 1].text()).toBe(
      "Dato er påkrevd"
    );
  });

  it("Check that send to confirm works", async () => {
    // Set valid days
    wrapper.vm.setDate({
      startDate: "2020-01-01",
      endDate: "2020-02-01",
    });
    wrapper.find("button").trigger("click");
    // wait a tick
    await wrapper.vm.$nextTick();

    // Check that method to change component was called
    expect(mockCreatePush).toHaveBeenCalledTimes(1);
  });

  it("Test that price calculation works", async () => {
    wrapper.vm.setDate({
      startDate: new Date("2022-01-01"),
      endDate: new Date("2022-01-03"),
    });
    // wait a tick
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.totPrice).toBe(200);
  });
});
