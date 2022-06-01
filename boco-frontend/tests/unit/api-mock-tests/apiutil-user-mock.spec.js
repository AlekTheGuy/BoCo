import { getUser } from "@/utils/apiutil";
import axios from "axios";

jest.mock("axios");

describe("testing mocking of apiutil.js", () => {
  it("check that existing user returns correctly", async () => {
    const expectedResponse = {
      response:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiNiIsImV4cCI6MTY1MTEzMDU2NywiZmlyc3RfbmFtZSI6IkFsaWRhIiwiZW1haWwiOiJhbGlkYUB0ZXN0Lm5vIn0.Cp3_qfLhA55j5yaa1WPG97LNtvAZssxo0ROP3VIrHVs",
    };
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const userResponse = await getUser(1);
    expect(userResponse).not.toEqual({ response: "User not found in DB" });
  });
  it("check that non-existing user returns 404", async () => {
    const expectedResponse = { response: "User not found in DB" };
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const userResponse = await getUser(100000);
    expect(userResponse).toEqual(expectedResponse);
  });
});
