import {
  postNewImageCommunity,
  PostImagesArrayToListing,
} from "@/utils/apiutil";
import axios from "axios";

jest.mock("axios");

describe("testing mocking of apiutil.js image api calls", () => {
  it("check that image gets posted", async () => {
    let expectedResponse = 1;

    axios.post.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const imageResponse = await postNewImageCommunity("image");
    expect(imageResponse).toBe(expectedResponse);
  });

  it("check that image array gets posted to listing", async () => {
    let expectedResponse = "OK";

    const imageArray = {
      image1: {
        image: "image1",
      },
      image2: {
        image2: "image2",
      },
    };

    axios.post.mockImplementation(() =>
      Promise.resolve({ data: expectedResponse })
    );

    const imageResponse = await PostImagesArrayToListing(imageArray);
    expect(imageResponse.data).toBe(expectedResponse);
  });
});
