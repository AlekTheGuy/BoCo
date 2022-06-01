import { tokenHeader } from "@/utils/token-utils";
import axios from "axios";

const API_URL = process.env.VUE_APP_BASEURL;

class UserService {
  async getUserFromId(userId) {
    return await axios
      .get(API_URL + "users/" + userId + "/profile", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  async getAdminList() {
    return await axios
      .get(API_URL + "communities/admin", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async getUserRatingAverage(userId) {
    return await axios
      .get(API_URL + "rating/" + userId + "/average", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  async getUserRatingAverageOwner(userId) {
    return await axios
      .get(API_URL + "rating/" + userId + "/average/owner", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  async getUserRatingAverageRenter(userId) {
    return await axios
      .get(API_URL + "rating/" + userId + "/average/renter", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  async setListingToDeleted(listingId) {
    return await axios
      .delete(API_URL + "listing/" + listingId, {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async getRenterHistory() {
    return await axios
      .get(API_URL + "user/profile/rent/history", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  }

  async getOwnerHistory() {
    return await axios
      .get(API_URL + "user/profile/rent/history/owner", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async isRated(rentID) {
    return await axios
      .get(API_URL + "rating/" + rentID + "/israted", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async getUserRatingAsRenter(userId) {
    return await axios
      .get(API_URL + "rating/" + userId + "/average/renter", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  async getUserRatingAsOwner(userId) {
    return await axios
      .get(API_URL + "rating/" + userId + "/average/owner", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  async deleteUser() {
    return await axios
      .delete(API_URL + "user/delete", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  async registerUser(userInfo) {
    return await axios
      .post(API_URL + "register", userInfo)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (err.response) {
          return err.response.data;
        }
        console.error(err);
      });
  }
}
export default new UserService();
