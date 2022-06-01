import { tokenHeader } from "@/utils/token-utils";
import axios from "axios";

const API_URL = process.env.VUE_APP_BASEURL;

class CommunityService {
  async getCommunity(communityID) {
    return await axios
      .get(API_URL + "community/" + communityID, {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getAllCommunities() {
    return await axios
      .get(API_URL + "communities", {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getUserCommunities() {
    return await axios
      .get(API_URL + "user/communities", {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getCommunityMembers(communityID) {
    return await axios
      .get(API_URL + "community/" + communityID + "/members", {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async leaveCommunity(communityID) {
    return await axios.patch(
      API_URL + "/communities/" + communityID + "/leave",
      {
        headers: tokenHeader(),
      }
    );
  }
}

export default new CommunityService();
