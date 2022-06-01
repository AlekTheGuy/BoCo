<template>
  <!-- A card for displaying a user in a list.
       Displays a user's profile picture, name, rating and some
       buttons based on where the list is being shown. -->
  <div
    class="bg-white shadow dark:bg-gray-800 select-none cursor-pointer hover:bg-gray-50 flex items-center p-4"
  >
    <!-- User image -->
    <div class="h-10 w-10 flex flex-col justify-center items-center mr-4">
      <router-link :to="'/profile/' + user.userId">
        <img alt="Profilbilde" :src="getProfilePicture" />
      </router-link>
    </div>

    <!-- User name -->
    <div class="flex-1 pl-1">
      <div class="font-medium dark:text-white">
        {{ user.firstName }} {{ user.lastName }}
      </div>
    </div>

    <!-- User rating -->
    <div class="hidden md:block flex-auto">
      <RatingComponent :rating="rating" :ratingType="'Vurderinger'" />
    </div>

    <!-- Buttons -->
    <div class="flex flex-row gap-4">
      <IconButton
        v-if="buttons.includes('chat') && userID != user.userId"
        @click="openChatWithUser()"
        :text="'Chat'"
        :buttonColor="'blue'"
      >
        <ChatIcon
      /></IconButton>

      <IconButton
        v-if="buttons.includes('kick') && userID != user.userId"
        @click="kickUserFromCommunity()"
        :buttonColor="'red'"
        :text="'Spark'"
        ><BanIcon
      /></IconButton>

      <IconButton
        v-if="buttons.includes('accept')"
        @click="acceptMemberRequest()"
        :buttonColor="'green'"
        :text="'Godta'"
        ><CheckCircleIcon
      /></IconButton>

      <IconButton
        v-if="buttons.includes('reject')"
        @click="rejectMemberRequest()"
        :buttonColor="'red'"
        :text="'Avslå'"
        ><XCircleIcon
      /></IconButton>
    </div>
  </div>
</template>

<script>
import RatingComponent from "@/components/UserProfileComponents/RatingComponents/Rating.vue";
import IconButton from "@/components/BaseComponents/IconButton.vue";
import CommunityAdminService from "@/services/community-admin.service";
import { parseCurrentUser } from "@/utils/token-utils";

import {
  ChatIcon,
  CheckCircleIcon,
  BanIcon,
  XCircleIcon,
} from "@heroicons/vue/outline";

export default {
  name: "UserListItem",
  data() {
    return {
      communityID: -1,
      profileImage: {
        src: require("../../assets/defaultUserProfileImage.jpg"),
      },
    };
  },
  components: {
    RatingComponent,
    IconButton,
    ChatIcon,
    CheckCircleIcon,
    BanIcon,
    XCircleIcon,
  },
  props: {
    user: Object,
    buttons: Array,
    rating: Number,
  },
  computed: {
    userID() {
      return parseCurrentUser().accountId;
    },
    /**
     * returns the user's profile picture. If the user does not have any
     * profile picture the default profile picture is returned.
     */
    getProfilePicture() {
      if (this.user.picture !== "" && this.user.picture != null) {
        return this.user.picture;
      }
      return this.profileImage.src;
    },
  },
  methods: {
    /**
     * If chat button clicked, the user's gets redirected to chat page.
     */
    openChatWithUser() {
      this.$router.push({
        name: "messages",
        query: { userID: this.user.userId },
      });
    },

    /**
     * Admin related methods for kicking a user from a community,
     * accepting and rejecting a user's join community request
     */
    kickUserFromCommunity() {
      CommunityAdminService.removeUserFromCommunity(
        this.communityID,
        this.user.userId
      );
      window.location.reload();
    },
    acceptMemberRequest() {
      CommunityAdminService.acceptUserIntoCommunity(
        this.communityID,
        this.user.userId
      );
    },
    rejectMemberRequest() {
      CommunityAdminService.rejectUserFromCommunity(
        this.communityID,
        this.user.userId
      );
    },
  },
  async beforeMounted() {
    this.communityID = this.$route.params.communityID;
  },
};
</script>
