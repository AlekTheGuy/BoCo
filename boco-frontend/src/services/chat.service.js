import axios from "axios";
import { tokenHeader } from "@/utils/token-utils";

const API_URL = process.env.VUE_APP_BASEURL;

/**
 * Service class acting as a middle layer between our components and the API
 */
class ChatService {
  /**
   * Service method to get the logged in user's conversations.
   * @returns an array of objects containing two objects containing the last message and the recipient.
   */
  async getConversations() {
    return await axios
      .get(API_URL + "chats/users", {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default new ChatService();
