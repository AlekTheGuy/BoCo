<template>
  <div class="chat">
    <div class="conversations">
      <h1>Meldinger</h1>
      <hr />
      <ChatProfile
        v-for="(conversation, i) in conversations"
        :conversation="conversation"
        :key="i"
        @recipient="selectUser"
      ></ChatProfile>
      <!-- If no conversatiosn show no conversations found -->
      <div v-if="conversations.length === 0" class="no-conversations">
        <p>Ingen samtaler</p>
      </div>
    </div>
    <div class="current-chat">
      <ChatComponent
        @openHamburger="openHamburger"
        v-if="recipientID"
        :recipientID="recipientID"
      ></ChatComponent>
      <div v-else class="nothing-selected">
        <p>Select a user to start a chat</p>
      </div>
    </div>
  </div>
</template>

<script>
import ChatProfile from "./ChatProfile.vue";
import ChatComponent from "./ChatComponent.vue";
import { parseCurrentUser } from "@/utils/token-utils";
import ws from "@/services/ws";

export default {
  props: {},
  watch: {
    $route() {
      const newVal = this.$route.query?.userID || null;
      this.recipientID = newVal;
    },
  },
  data: () => {
    return {
      messages: [],
      message: "",
      recipient: null,
      hambuger: "none",
      conversations: [],
      hambugerDisplay: "none",
      recipientID: null,
    };
  },
  components: { ChatProfile, ChatComponent },
  computed: {
    userid() {
      return parseCurrentUser().accountId;
    },
    name() {
      return this.recipient.firstName + " " + this.recipient.lastName;
    },
  },
  methods: {
    selectUser(recipientID) {
      this.hambugerDisplay = "none";
      this.$router.push({ path: "messages", query: { userID: recipientID } });
    },
    openHamburger() {
      this.hambugerDisplay = "block";
    },
    calculateSide(from) {
      return from == this.userid ? "end" : "start";
    },
    async fetchChats() {
      const token = this.$store.state.user.token;
      // Get all conversations from api with /chats/users
      const conResponse = await fetch(
        `${process.env.VUE_APP_BASEURL}chats/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ); // add error handling
      this.conversations = await conResponse.json();
    },
  },
  async created() {
    await this.fetchChats();
    ws.on(
      "NEW_MESSAGE",
      async () => {
        await this.fetchChats();
      },
      "chats"
    );
    this.recipientID = this.$route.query?.userID || null;
    if (!this.recipientID) this.hambugerDisplay = "block";
  },
  unmounted() {
    ws.end("NEW_MESSAGE", "chats");
  },
};
</script>
<style scoped>
.chat {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: min(100vh - 3.5rem);
}

.nothing-selected {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.no-conversations {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.nothing-selected p {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.current-chat {
  width: 100%;
  height: 100%;
}

.conversations {
  min-width: 300px;
  border-right-width: 1px;
  border-color: black;
  height: 100%;
}

.conversations h1 {
  padding: 0.5rem;
  padding-left: 0;
  align-self: center;
  margin-left: 10px;
  color: #4b5563;
  font-weight: bold;
  font-size: large;
}

@media screen and (max-width: 600px) {
  .conversations {
    display: v-bind(hambugerDisplay);
    z-index: 99;
    width: 100%;
    position: absolute;
    background-color: white;
  }

  .conversations h1 {
    text-align: center;
  }
}

.button {
  display: flex;
  justify-content: center;
  padding: 0.75rem;
}
</style>
