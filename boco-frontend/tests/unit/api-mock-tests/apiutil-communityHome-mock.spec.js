import { GetCommunity, GetListingsInCommunity } from "@/utils/apiutil";
import axios from "axios";

jest.mock("axios");

describe("testing mocking of apiutil.js", () => {
  it("check that existing group returns correctly", async () => {
    const expectedResponse = {
      communityId: 4040,
      name: "Fisken i vannet",
      description: "For vi som liker fjell fisk",
      visibility: 1,
      location: "Bergen brygge",
      picture: "fish blub blub",
    };

    axios.get.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const communityResponse = await GetCommunity(4040);
    expect(communityResponse.name).toBe(expectedResponse.name);
  });

  it("check that existing group returns correct listings", async () => {
    const expectedResponse = {
      item1: {
        title: "Fiskekurs",
        description: "Fisking og sånn",
        pricePerDay: 200,
        address: "Vannet",
        userID: 6,
        categoryNames: null,
        communityIDs: null,
      },

      item2: {
        title: "TestFraFrontend",
        description: "oslo",
        pricePerDay: 500,
        address: "oslo",
        userID: 1,
        categoryNames: null,
        communityIDs: null,
      },
    };

    axios.get.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const communityItemResponse = await GetListingsInCommunity(4040);
    expect(communityItemResponse).toBe(expectedResponse);
  });
});
