<template>
  <a
    v-on:click="selectUser"
    class="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
  >
    <img
      class="h-10 w-10 rounded-full object-cover"
      :src="src || 'S../../assets/defaultUserProfileImage.jpg'"
      :alt="{ name }"
    />
    <div class="w-full pb-2">
      <div class="flex justify-between">
        <span class="block ml-2 font-semibold text-base text-gray-600">{{
          name
        }}</span>
        <span class="block ml-2 text-sm text-gray-600">{{
          lastMessageTime
        }}</span>
      </div>
      <span class="block ml-2 text-sm text-gray-600">{{ lastMessage }}</span>
    </div>
  </a>
</template>

<script>
//TODO fix avatar
export default {
  props: {
    conversation: {
      type: Object,
      required: true,
    },
    recipient: Function,
  },
  data: () => {
    return {};
  },
  computed: {
    lastMessage() {
      return this.conversation.lastMessage.content;
    },
    name() {
      return (
        this.conversation.recipient.firstName +
        " " +
        this.conversation.recipient.lastName
      );
    },
    lastMessageTime() {
      // Calculate time since last message
      const time = this.conversation.lastMessage.timestamp;
      const now = new Date();
      const diff = now - time;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);

      if (seconds < 60) {
        return "Just now";
      } else if (minutes < 60) {
        return minutes + " minutes ago";
      } else if (hours < 24) {
        return hours + " hours ago";
      } else if (days < 30) {
        return days + " days ago";
      } else if (months < 12) {
        return months + " months ago";
      } else {
        return years + " years ago";
      }
    },
    src() {
      return this.conversation.recipient.picture
        ? this.conversation.recipient.picture
        : require("@/assets/defaultUserProfileImage.jpg");
    },
  },
  methods: {
    selectUser() {
      this.$emit("recipient", this.conversation?.recipient.userId);
    },
  },
};
</script>
