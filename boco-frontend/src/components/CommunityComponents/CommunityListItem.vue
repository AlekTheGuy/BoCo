<template>
  <div>
    <CustomFooterModal
      @close="this.dialogOpen = false"
      :visible="dialogOpen"
      :title="community.name"
      :message="community.description"
    >
      <div class="flex justify-center p-2">
        <!-- If a user is not a member in the community, this button will show -->
        <ColoredButton
          v-if="!member && community.visibility !== 0"
          :text="'Bli med'"
          @click="goToJoin(community.communityId)"
          class="m-2"
        />

        <ColoredButton
          v-if="!member && community.visibility === 0"
          :text="'Spør om å bli med'"
          @click="goToRequest(community.communityId)"
          class="m-2"
        />

        <!-- If a user is member this button will show -->
        <ColoredButton
          v-if="member"
          :text="'Gå til'"
          @click="goToGroup(community.communityId)"
          class="m-2"
        />

        <!-- If a user isn't member but the community is open, the user is able to get in to see listings(items) -->
        <ColoredButton
          v-if="!member && community.visibility === 1"
          :text="'Gå til'"
          @click="goToGroup(community.communityId)"
          class="m-2"
        />
      </div>

      <!-- If a user is not logged in and tries to join a community, this message shows -->
      <div class="flex justify-center p-2">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          {{ responseToUser }}
        </p>
      </div>
    </CustomFooterModal>
    <div
      @click="toggleDialog()"
      class="bg-white shadow dark:bg-gray-800 select-none cursor-pointer hover:bg-gray-50 flex items-center p-2"
    >
      <div
        v-if="!community.picture"
        class="h-10 w-10 flex flex-col justify-center items-center ml-2 mr-2"
      >
        <UserGroupIcon alt="Bilde" class="h-10 w-10 text-primary-dark" />
      </div>
      <div
        v-else
        class="h-3 w-14 flex flex-col justify-center items-center ml-2 mt-4 mb-4 mr-2"
      >
        <img
          :src="community.picture"
          alt="Bilde"
          class="rounded-md h-14 w-14 object-contain"
        />
      </div>
      <div class="flex-1 pl-1 overflow-hidden">
        <div class="font-medium text-gray-800 dark:text-white truncate">
          {{ community.name }}
        </div>
      </div>
      <div class="flex flex-row justify-center items-center">
        <LockClosedIcon
          v-if="community.visibility === 0"
          class="max-h-6 max-w-6 shrink m-2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CustomFooterModal from "@/components/BaseComponents/CustomFooterModal.vue";
import ColoredButton from "@/components/BaseComponents/ColoredButton.vue";
import { UserGroupIcon, LockClosedIcon } from "@heroicons/vue/outline";
import { JoinOpenCommunity } from "@/utils/apiutil";

export default {
  name: "CommunityListItem",
  components: {
    CustomFooterModal,
    ColoredButton,
    UserGroupIcon,
    LockClosedIcon,
  },
  data() {
    return {
      dialogOpen: false,
      responseToUser: "",
    };
  },
  props: {
    community: Object,
    member: Boolean,
  },
  methods: {
    goToGroup(id) {
      this.$router.push("/community/" + id);
    },
    async goToJoin(id) {
      const response = await JoinOpenCommunity(id);
      if (response === "Login to join any community") {
        this.responseToUser = "Logg inn først for å bli med i en gruppe";
      } else {
        this.$router.push("/community/" + id);
      }
    },
    goToRequest(id) {
      this.$router.push("/community/" + id + "/private/join");
    },
    toggleDialog() {
      this.dialogOpen = !this.dialogOpen;
    },
  },
};
</script>
