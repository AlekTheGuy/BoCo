import { tokenHeader } from "@/utils/token-utils";
import axios from "axios";

const API_URL = process.env.VUE_APP_BASEURL;

class ListingService {
  async putItem(itemInfo) {
    return await axios
      .put(API_URL + "listing/change", itemInfo, {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  async getItem(itemid) {
    return await axios
      .get(API_URL + "listing/" + itemid, {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getItemPictures(itemid) {
    return await axios
      .get(API_URL + "listing/" + itemid + "/pictures", {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  postNewItem(itemInfo) {
    return axios
      .post(API_URL + "listing", itemInfo, {
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

export default new ListingService();
