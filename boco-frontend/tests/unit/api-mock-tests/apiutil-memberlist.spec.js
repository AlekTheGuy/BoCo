import { GetMembersOfCommunity } from "@/utils/apiutil";
import axios from "axios";

jest.mock("axios");

describe("testing mocking of apiutil.js", () => {
  it("check that existing group returns correct members", async () => {
    const expectedResponse = {
      member1: {
        userId: 2,
        email: "erik@erik.com",
        firstName: "erik",
        lastName: "hansen",
        address: "gløshaugen",
        picture: "ok",
      },

      member2: {
        userId: 1,
        email: "test@test.com",
        firstName: "test",
        lastName: "testesen",
        address: "oslo",
        picture: "ok",
      },
    };

    axios.get.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const communityMembersResponse = await GetMembersOfCommunity(4040);
    expect(communityMembersResponse).toBe(expectedResponse);
  });
});
