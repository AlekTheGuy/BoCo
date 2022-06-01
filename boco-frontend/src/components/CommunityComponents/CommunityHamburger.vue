<template>
  <!-- Hamburger menu for community header, contains options for adding a new listing,
       seeing all members in the community, administrating the community if admin and
       leaving the community -->
  <div
    id="dropdown"
    class="z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
  >
    <ul class="py-1">
      <li id="newItem">
        <router-link
          to="/newItem"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >Opprett Utleie</router-link
        >
      </li>
      <li id="getMembers">
        <router-link
          :to="'/community/' + communityID + '/memberlist'"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >Se Medlemmer
        </router-link>
      </li>
      <li id="adminGroup" v-if="admin">
        <router-link
          :to="'/community/' + communityID + '/admin'"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >Administrer Gruppe</router-link
        >
      </li>
      <li id="leaveGroup" v-if="!admin">
        <div
          class="cursor-pointer block py-2 px-4 text-sm text-error-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          @click="this.$emit('openLeaveCommunityDialog')"
        >
          Forlat Gruppe
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CommunityHamburger",
  data() {
    return {
      id: -1,
      admin: false,
      communityID: -1,
    };
  },
  created() {
    this.communityID = this.$route.params.communityID;
    if (!Array.isArray(this.$store.state.user.adminList)) return;
    this.admin = this.$store.state.user.adminList.includes(
      parseInt(this.communityID)
    );
  },
};
</script>
