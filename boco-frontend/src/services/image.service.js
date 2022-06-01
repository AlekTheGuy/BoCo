import { tokenHeader } from "@/utils/token-utils";
import axios from "axios";

const API_URL = process.env.VUE_APP_BASEURL;

class ImageService {
  postNewImage(image) {
    return axios
      .post(API_URL + "images", image, {
        headers: { ...tokenHeader(), "Content-Type": "image/png" },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  postImagesArrayToListing(images) {
    return axios
      .post(API_URL + "listing/pictures", images, {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  putListingImages(listingID, images) {
    return axios
      .put(API_URL + "listing/" + listingID + "/pictures", images, {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  deleteImage(image) {
    return axios
      .delete(image, {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error.response);
      });
  }
}

export default new ImageService();
