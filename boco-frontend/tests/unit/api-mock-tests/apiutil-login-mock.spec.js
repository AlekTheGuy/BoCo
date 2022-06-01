import { doLogin } from "@/utils/apiutil";
import axios from "axios";

jest.mock("axios");

describe("testing mocking of apiutil.js", () => {
  it("check that login fails with wrong credentials - against mock", async () => {
    const loginRequest = {
      email: "wrong@email.com",
      password: "thisiswrong123",
    };

    const expectedLoginResponse = { isLoggedIn: false, token: "" };

    axios.post.mockImplementation(() =>
      Promise.resolve({ data: expectedLoginResponse })
    );

    const loginResponse = await doLogin(loginRequest);

    expect(loginResponse.token.isLoggedIn).toEqual(
      expectedLoginResponse.isLoggedIn
    );
  });

  it("check that login succeeds when correct credentials - against mock", async () => {
    const loginRequest = {
      email: "correct@email.com",
      password: "thisiscorrect123",
    };

    const apiResponse = {
      isLoggedIn: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM" +
        "0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    };

    const expectedLoginResponse = { isLoggedIn: false, token: "" };

    axios.post.mockImplementation(() => Promise.resolve({ data: apiResponse }));

    const loginResponse = await doLogin(loginRequest);

    expect(loginResponse.token.isLoggedIn).not.toEqual(
      expectedLoginResponse.isLoggedIn
    );
  });
});
