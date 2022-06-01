<template>
  <!-- Shows all members in a community -->
  <div>
    <ul v-if="members.length">
      <li v-for="member in members" :key="member.userId">
        <UserListItemCard :buttons="buttons" :user="member" />
      </li>
    </ul>
    <div v-else class="flex place-content-center text-gray-400">
      Ingenting å vise
    </div>
  </div>
</template>

<script>
import UserListItemCard from "@/components/UserProfileComponents/UserListItemCard.vue";
import CommunityService from "@/services/community.service";
import { GetMemberRequestsOfCommunity } from "@/utils/apiutil";

export default {
  name: "MemberList",
  components: {
    UserListItemCard,
  },
  props: {
    buttons: Array,
    requests: Boolean,
  },
  data() {
    return {
      members: [],
      loading: false,
    };
  },
  methods: {
    async load() {},
  },
  async created() {
    this.loading = true;
    if (this.requests) {
      this.members = await GetMemberRequestsOfCommunity(
        this.$route.params.communityID
      );
    } else {
      this.members = await CommunityService.getCommunityMembers(
        this.$route.params.communityID
      );
    }
    this.loading = false;
  },
};
</script>
