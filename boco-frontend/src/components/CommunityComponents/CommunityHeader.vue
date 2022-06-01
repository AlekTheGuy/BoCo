<template>
  <!-- Community header contains the community's name and address, a join button if
       the user is not in the community and community hamburger menu if the user is
       in the community -->
  <div>
    <!-- A warning asking user is it is sure it wants to leave the community when leave community
         from hamburger menu is clicked -->
    <CustomFooterModal
      :title="'Er du sikker på at du vil forlate felleskapet?'"
      :message="'Dersom felleskapet er låst er du nødt til å spørre om å bli med på nytt.'"
      :visible="leaveDialog"
      @close="this.leaveDialog = false"
    >
      <div class="flex place-content-center min-w-6">
        <ColoredButton
          class="m-2"
          :buttonColor="'red'"
          @click="leaveCommunity()"
          :text="'Ja'"
        />
        <ColoredButton
          class="m-2"
          :text="'Nei'"
          @click="this.leaveDialog = false"
        />
      </div>
    </CustomFooterModal>

    <!-- The load spinner will show while community and it's members are being loaded from the db -->
    <div v-if="loading" class="flex place-content-center mx-4">
      <LoaderSpinner />
    </div>

    <!-- After loaded the community header shows -->
    <div v-else class="flex items-center justify-between mx-4">
      <router-link
        :to="'/community/' + community.communityId"
        class="flex-1 min-w-0"
      >
        <h2
          class="text-xl md:text-2xl text-gray-600 font-medium w-full sm:truncate"
        >
          {{ community.name }}
        </h2>
        <div
          class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6"
        >
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <svg
              class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            {{ community.location }}
          </div>
        </div>
      </router-link>
      <div>
        <!-- If the user is not a member in the community, this button will show -->
        <div v-if="!member">
          <ColoredButton
            v-if="!member"
            :text="'Bli med'"
            @click="joinCommunity(community.communityId)"
            class="m-2"
          />

          <CustomFooterModal
            @close="this.dialogOpen = false"
            :visible="dialogOpen"
            title="Kan ikke bli med"
            message="Logg inn først for å bli med i en gruppe."
          />
        </div>

        <!-- If the user is member of the community, this hamburger menu will show -->
        <div v-if="member">
          <svg
            @click="toggleHamburgerMenu()"
            xmlns="http://www.w3.org/2000/svg"
            class="w-9 h-9 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <CommunityHamburger
            @openLeaveCommunityDialog="this.leaveDialog = true"
            v-if="hamburgerOpen"
            class="origin-top-right absolute right-0"
            :community-i-d="community.communityId"
            :admin="admin"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommunityHamburger from "@/components/CommunityComponents/CommunityHamburger";
import ColoredButton from "@/components/BaseComponents/ColoredButton";
import LoaderSpinner from "@/components/BaseComponents/LoaderSpinner";
import CommunityService from "@/services/community.service";
import CustomFooterModal from "@/components/BaseComponents/CustomFooterModal";
import { parseCurrentUser } from "@/utils/token-utils";
import { LeaveCommunity } from "@/utils/apiutil";

import {
  JoinOpenCommunity,
  // GetIfUserAlreadyInCommunity,
} from "@/utils/apiutil";

export default {
  name: "CommunityHeader",
  components: {
    CommunityHamburger,
    ColoredButton,
    CustomFooterModal,
    LoaderSpinner,
  },
  computed: {
    userid() {
      return parseCurrentUser().accountId;
    },
  },
  data() {
    return {
      hamburgerOpen: false,
      leaveDialog: false,
      member: false,
      community: {},
      loading: true,
      dialogOpen: false,
    };
  },
  props: {
    admin: Boolean,
  },
  methods: {
    toggleHamburgerMenu() {
      this.hamburgerOpen = !this.hamburgerOpen;
    },
    leaveCommunity: async function () {
      await LeaveCommunity(this.community.communityId);
      this.$router.push("/");
    },
    async load() {
      this.community = await CommunityService.getCommunity(
        this.$route.params.communityID
      );
      if (this.$store.state.user.token !== null) {
        const members = await CommunityService.getCommunityMembers(
          this.$route.params.communityID
        );
        for (let i = 0; i < members.length; i++) {
          if (members[i].userId == this.userid) {
            this.member = true;
            return;
          }
        }
      }
    },
    joinCommunity: async function (id) {
      const response = await JoinOpenCommunity(id);
      if (response === "Login to join any community") {
        this.dialogOpen = true;
      } else {
        window.location.reload();
      }
    },
  },
  async created() {
    await this.load();
    this.loading = false;
  },
};
</script>
