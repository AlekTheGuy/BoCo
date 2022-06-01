<template>
  <!-- A view for showing all the communities a user is part of -->
  <div>
    <div v-if="loading" class="flex place-content-center p-8">
      <LoaderSpinner />
    </div>
    <div v-else>
      <!-- My communities, with pagination -->
      <div class="flex flex-row p-4 relative">
        <div class="text-xl md:text-2xl text-primary-light font-medium w-full">
          Mine grupper
        </div>
        <UserAddIcon
          class="cursor-pointer max-h-6 max-w-6 float-right grow text-primary-dark"
          @click="$router.push('/newCommunity')"
          alt="Opprett ny gruppe"
        />
      </div>
      <CommunityList :communities="myCommunities" :member="true" />
    </div>
  </div>
</template>

<script>
import CommunityList from "@/components/CommunityComponents/CommunityList.vue";
import CommunityService from "@/services/community.service";
import { UserAddIcon } from "@heroicons/vue/outline";
import LoaderSpinner from "@/components/BaseComponents/LoaderSpinner";

export default {
  data() {
    return {
      myCommunities: [],
      loading: false,
    };
  },
  components: {
    CommunityList,
    UserAddIcon,
    LoaderSpinner,
  },
  async beforeCreate() {
    this.loading = true;
    this.myCommunities = await CommunityService.getUserCommunities();
    this.loading = false;
  },
};
</script>
