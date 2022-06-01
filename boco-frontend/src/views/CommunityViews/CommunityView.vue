<template>
  <div>
    <div v-if="loading" class="flex place-content-center p-8 min-h-screen">
      <LoaderSpinner />
    </div>
    <div v-else class="min-h-screen">
      <!-- My communities, with pagination -->
      <div v-if="loggedIn">
        <div class="flex flex-row p-4 relative">
          <div
            class="text-xl md:text-2xl text-primary-medium font-medium w-full"
          >
            Mine grupper
          </div>
          <UserAddIcon
            class="cursor-pointer max-h-6 max-w-6 float-right grow text-primary-dark"
            @click="$router.push('/newCommunity')"
            alt="Opprett ny gruppe"
          />
        </div>
        <CommunityList :communities="visibleMyCommunities" :member="true" />

        <!-- pagination my communities -->
        <div class="flex justify-center">
          <PaginationTemplate
            v-bind:items="myCommunities"
            v-on:page:update="updatePageMyCommunities"
            v-bind:currentPage="currentPageMyCommunities"
            v-bind:pageSize="pageSizeMyCommunities"
            class="mt-4"
          />
        </div>
      </div>

      <!-- Public communities, with search and pagination -->
      <p class="text-xl md:text-2xl text-primary-medium font-medium w-full p-4">
        Offentlige grupper
      </p>
      <!-- Search field -->
      <div class="relative mt-1 mx-2" id="searchComponent">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <div class="w-5 h-5 text-gray-400">
            <SearchIcon />
          </div>
        </span>

        <input
          type="text"
          id="searchInput"
          class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary-medium dark:focus:border-primary-medium focus:outline-none focus:ring"
          placeholder="Søk"
          v-model="search"
          @change="searchWritten"
        />
      </div>

      <!-- Public communities list, two lists, one for when it's searched and one for pagination -->
      <div v-if="showPaginated">
        <CommunityList
          :communities="visiblePublicCommunities"
          :member="false"
        />
      </div>
      <div v-if="showSearched">
        <CommunityList :communities="searchPublicCommunities" :member="false" />
      </div>
      <!-- pagination Public communities -->
      <div class="flex justify-center">
        <PaginationTemplate
          v-bind:items="publicCommunities"
          v-on:page:update="updatePagePublicCommunities"
          v-bind:currentPage="currentPagePublicCommunities"
          v-bind:pageSize="pageSizePublicCommunities"
          class="my-4"
        />
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import CommunityList from "@/components/CommunityComponents/CommunityList.vue";
import { UserAddIcon, SearchIcon } from "@heroicons/vue/outline";
import PaginationTemplate from "@/components/BaseComponents/PaginationTemplate";
import CommunityService from "@/services/community.service";
import LoaderSpinner from "@/components/BaseComponents/LoaderSpinner";
import FooterBar from "@/components/BaseComponents/FooterBar";

export default {
  name: "HomeView",
  data() {
    return {
      loading: false,
      loggedIn: false,
      myCommunities: [],
      publicCommunities: [],
      search: "",
      showSearched: false,
      showPaginated: true,

      //Variables connected to pagination
      currentPagePublicCommunities: 0,
      currentPageMyCommunities: 0,
      pageSizeMyCommunities: 5,
      pageSizePublicCommunities: 10,
      visiblePublicCommunities: [],
      visibleMyCommunities: [],
    };
  },
  components: {
    CommunityList,
    UserAddIcon,
    PaginationTemplate,
    SearchIcon,
    LoaderSpinner,
    FooterBar,
  },
  computed: {
    searchPublicCommunities() {
      let filteredItems = [];

      filteredItems = this.publicCommunities.filter(
        (p) =>
          p.name.toLowerCase().includes(this.search.toLowerCase()) ||
          p.location.toLowerCase().includes(this.search.toLowerCase())
      );

      return filteredItems;
    },
  },
  methods: {
    //Pagination
    updatePagePublicCommunities(pageNumber) {
      this.currentPagePublicCommunities = pageNumber;
      this.updateVisibleCommunities();
    },
    updatePageMyCommunities(pageNumber) {
      this.currentPageMyCommunities = pageNumber;
      this.updateVisibleCommunities();
    },
    updateVisibleCommunities() {
      this.visiblePublicCommunities = this.publicCommunities.slice(
        this.currentPagePublicCommunities * this.pageSizePublicCommunities,
        this.currentPagePublicCommunities * this.pageSizePublicCommunities +
          this.pageSizePublicCommunities
      );
      this.visibleMyCommunities = this.myCommunities.slice(
        this.currentPageMyCommunities * this.pageSizeMyCommunities,
        this.currentPageMyCommunities * this.pageSizeMyCommunities +
          this.pageSizeMyCommunities
      );

      // if we have 0 visible communities, go back a page
      if (
        this.visiblePublicCommunities.length === 0 &&
        this.currentPagePublicCommunities > 0
      ) {
        this.updatePagePublicCommunities(this.currentPagePublicCommunities - 1);
      }
      if (
        this.visibleMyCommunities.length === 0 &&
        this.currentPageMyCommunities > 0
      ) {
        this.updatePageMyCommunities(this.currentPageMyCommunities - 1);
      }
    },
    searchWritten() {
      //This method triggers when search input field is changed
      this.showPaginated = this.search.length < 1;
      this.showSearched = this.search.length > 0;
    },
    async load() {
      this.publicCommunities = await CommunityService.getAllCommunities();
      this.loggedIn = this.$store.state.user.token !== null;
      if (!this.loggedIn) return;
      this.myCommunities = await CommunityService.getUserCommunities();
    },
  },
  async mounted() {
    this.loading = true;
    await this.load();
    //Double loop not bad :)
    for (var i = 0; i < this.publicCommunities.length; i++) {
      for (var j = 0; j < this.myCommunities.length; j++) {
        if (
          this.publicCommunities?.[i]?.communityId ===
          this.myCommunities?.[j]?.communityId
        ) {
          this.publicCommunities.splice(i, 1);
        }
      }
    }
    this.updateVisibleCommunities();
    this.loading = false;
  },
};
</script>
