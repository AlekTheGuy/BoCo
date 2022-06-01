<template>
  <!-- User profile with the logged in user's info and a dropdown menu-->
  <div
    class="w-full max-w-xl m-auto md:ring-1 ring-gray-300 overflow-hidden rounded-xl p-4"
  >
    <!-- A warning when deleting a user account to ask the user
         if it is sure -->
    <DeleteUserModal
      :visible="show"
      @close="this.show = false"
      @deleteUser="deleteUser"
    />

    <!-- dropdown icon button to toggle(open/close) the dropdown menu -->
    <div v-show="isCurrentUser" class="float-right px-4 pt-4">
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        @click="dropdown = !dropdown"
        class="w-10 h-10 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg float-right text-sm p-1.5"
        type="button"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
          ></path>
        </svg>
      </button>

      <!-- Dropdown menu containing options for seeing user's items, user's communities,
           renting history, logging out, changing password and deleting account -->
      <div
        id="dropdown"
        v-show="dropdown"
        class="z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
      >
        <ul
          class="py-1 absolute bg-white ring-1 ring-gray-300 rounded-xl"
          aria-labelledby="dropdownDefault"
        >
          <li>
            <router-link
              to="/profile/items"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Mine gjenstander</router-link
            >
          </li>
          <li>
            <router-link
              :to="'/profile/communities'"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Mine grupper
            </router-link>
          </li>
          <li>
            <router-link
              to="/profile/history"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Leiehistorikk</router-link
            >
          </li>
          <li>
            <div
              @click="logout"
              class="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Logg ut
            </div>
          </li>
          <li>
            <router-link
              to="/newPassword"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Endre passord</router-link
            >
          </li>
          <li>
            <div
              class="block py-2 px-4 text-sm text-error-dark cursor-pointer"
              @click="toggleModal"
            >
              Slett bruker
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- User info (name, rating and profile picture) -->
    <div class="flex flex-col items-center pb-10 mt-16 z-5">
      <img
        class="mb-3 w-24 h-24 rounded-full shadow-lg"
        :src="getProfilePicture"
        alt="Profile picture"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {{ user.firstName }} {{ user.lastName }}
      </h5>
      <div>
        <rating-component :rating="renterRating" :ratingType="'Leietaker'" />
        <RatingComponent
          :rating="ownerRating"
          :ratingType="'Utleier'"
        ></RatingComponent>
      </div>

      <div
        v-show="!isCurrentUser"
        @click="$router.push('/messages?userID=' + id)"
        class="flex mt-4 space-x-3 lg:mt-6"
      >
        <a
          href="#"
          class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >Åpne chat</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import RatingComponent from "@/components/UserProfileComponents/RatingComponents/Rating.vue";
import { parseCurrentUser } from "@/utils/token-utils";
import { getUser } from "@/utils/apiutil";
import UserService from "@/services/user.service";
import DeleteUserModal from "@/components/UserAuthComponents/DeleteUserModal";

export default {
  name: "LargeProfileCard",
  data() {
    return {
      user: {},
      currentUser: {},
      id: -1,
      isCurrentUser: false,
      renterRating: -1,
      ownerRating: -1,
      dropdown: false,
      profileImage: {
        src: require("../../assets/defaultUserProfileImage.jpg"),
      },
      show: false,
    };
  },
  components: {
    RatingComponent,
    DeleteUserModal,
  },
  computed: {
    getProfilePicture() {
      if (this.user.picture !== "" && this.user.picture != null) {
        return this.user.picture;
      }
      return this.profileImage.src;
    },
    adminList() {
      return this.$store.state.user.adminList;
    },
  },
  methods: {
    /**
     * Gets the user and it's ratings
     */
    async getUser() {
      this.currentUser = await parseCurrentUser();
      this.id = await this.$router.currentRoute.value.params.id;

      if (this.id === this.currentUser.accountId) {
        this.isCurrentUser = true;
        this.user = this.currentUser;
        this.user = await UserService.getUserFromId(this.user.accountId);
      } else {
        this.user = await getUser(this.id);
      }
      let ratingAsOwner = await UserService.getUserRatingAverageOwner(this.id);
      let ratingAsRenter = await UserService.getUserRatingAverageRenter(
        this.id
      );

      if (ratingAsOwner >= 0 && ratingAsOwner <= 5) {
        this.ownerRating = ratingAsOwner;
      }
      if (ratingAsRenter >= 0 && ratingAsRenter <= 5) {
        this.renterRating = ratingAsRenter;
      }
    },

    /**
     * Logs out the user and sets token in state to be null.
     */
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    toggleModal() {
      this.show = !this.show;
    },
    async deleteUser() {
      await UserService.deleteUser();
      this.logout();
    },
  },
  async beforeMount() {
    await this.getUser();
  },
};
</script>
