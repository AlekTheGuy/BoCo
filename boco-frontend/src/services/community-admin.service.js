import axios from "axios";
import { tokenHeader } from "@/utils/token-utils";

const API_URL = process.env.VUE_APP_BASEURL;

/**
 * Service class acting as a middle layer between our components and the API
 */
class CommunityAdminService {
  /**
   * Checks if the current user is an admin in the community that is being accessed.
   * @param {Number} communityID ID of the community to the if the user is an admin in.
   * @returns a boolean.
   */
  async isUserAdmin(communityID) {
    return await axios
      .get(API_URL + "communities/" + communityID + "/user/admin", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      });
  }

  /**
   * Accepts a member request.
   * @param {Number} communityID the community to accept the request into.
   * @param {Number} userID the user id of the user being accepted into the community.
   * @returns the response.
   */
  async acceptUserIntoCommunity(communityID, userID) {
    return await axios.post(
      API_URL + "communities/" + communityID + "/requests",
      null,
      { headers: tokenHeader(), params: { userId: userID } }
    );
  }

  /**
   * Reject a user's request to join a community.
   * @param {Number} communityID id of the community to reject the request from.
   * @param {Number} userID id of the user being rejected.
   * @returns the response.
   */
  async rejectUserFromCommunity(communityID, userID) {
    return await axios.patch(
      API_URL + "communitites/" + communityID + "/requests/reject",
      null,
      { headers: tokenHeader(), params: { userId: userID } }
    );
  }

  /**
   * Method that kicks a user from a community
   * @param {Number} communityID the community to remove the user from
   * @param {Number} userID the user to remove
   * @returns the response.
   */
  async removeUserFromCommunity(communityID, userID) {
    return await axios.patch(
      API_URL + "communities/" + communityID + "/kick",
      null,
      {
        headers: tokenHeader(),
        params: {
          userId: userID,
        },
      }
    );
  }

  /**
   * Method to delete a community
   * @param {Number} communityID id of the community to delete.
   * @returns the response.
   */
  async deleteCommunity(communityID) {
    return await axios.delete(
      API_URL + "communities/" + communityID + "/remove",
      {
        headers: tokenHeader(),
      }
    );
  }
}

export default new CommunityAdminService();
