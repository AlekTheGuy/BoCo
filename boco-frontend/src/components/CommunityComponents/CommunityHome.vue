<template>
  <!-- The community home page, shows all the items in the community with the possibility of
       clicking on an item to be redirected to the item info page -->
  <div>
    <!-- Shows loading component while loading the content for the page -->
    <div v-if="loading" class="flex place-content-center">
      <LoaderSpinner />
    </div>
    <!-- When finish loading the home page for community is shown -->
    <section v-else class="w-full px-5 py-4 mx-auto rounded-md">
      <CommunityHeader :admin="false" class="mb-5" />

      <div v-if="!items.length" class="flex place-content-center text-gray-400">
        Ingen gjenstander å vise 🥺 👉👈
      </div>
      <div v-else>
        <!-- Search field -->
        <div class="relative" id="searchComponent">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>

          <input
            type="text"
            class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary-medium dark:focus:border-primary-medium focus:outline-none focus:ring"
            placeholder="Søk"
            v-model="search"
            @change="searchWritten"
          />
        </div>

        <div class="absolute inset-x-0">
          <!-- ItemCards -->
          <div class="flex items-center justify-center w-screen">
            <!-- Shows items based on pagination -->
            <div
              class="grid grid-flow-row-dense grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full"
              v-if="showItems"
            >
              <ItemCard
                v-for="item in visibleItems"
                :key="item"
                :item="item"
                @click="goToItemInfoPage(item.listingID)"
              />
            </div>

            <!-- Shows items based on search field input -->
            <div
              class="grid grid-flow-row-dense grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full"
              v-if="showSearchedItems"
            >
              <ItemCard
                v-for="item in searchedItems"
                :key="item"
                :item="item"
                @click="goToItemInfoPage(item.listingID)"
              />
            </div>
          </div>

          <!-- pagination -->
          <div class="flex justify-center" v-if="showItems">
            <PaginationTemplate
              v-bind:items="items"
              v-on:page:update="updatePage"
              v-bind:currentPage="currentPage"
              v-bind:pageSize="pageSize"
              class="mt-10"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ItemCard from "@/components/ItemComponents/ItemCard";
import CommunityHeader from "@/components/CommunityComponents/CommunityHeader";
import PaginationTemplate from "@/components/BaseComponents/PaginationTemplate";
import LoaderSpinner from "@/components/BaseComponents/LoaderSpinner";

import {
  GetCommunity,
  GetListingsInCommunity,
  getItemPictures,
} from "@/utils/apiutil";
export default {
  name: "CommunityHome",
  components: {
    CommunityHeader,
    ItemCard,
    PaginationTemplate,
    LoaderSpinner,
  },
  computed: {
    searchedItems() {
      let filteredItems = [];

      filteredItems = this.items.filter(
        (p) =>
          p.title.toLowerCase().includes(this.search.toLowerCase()) ||
          p.address.toLowerCase().includes(this.search.toLowerCase()) ||
          p.pricePerDay === Number(this.search)
      );

      return filteredItems;
    },
  },
  created() {
    if (this.$store.state.user.token !== null) {
      this.isLoggedIn = true;
    }
  },
  data() {
    return {
      search: "",
      items: [],
      item: {
        listingID: 0,
        img: "",
        address: "",
        title: "",
        pricePerDay: 0,
      },

      communityID: -1,
      community: {},

      showItems: true,
      showSearchedItems: false,

      loading: false,

      //Variables connected to pagination
      currentPage: 0,
      pageSize: 12,
      visibleItems: [],
    };
  },
  methods: {
    async getCommunityFromAPI() {
      this.communityID = this.$route.params.communityID;
      this.community = await GetCommunity(this.communityID);
    },
    getListingsOfCommunityFromAPI: async function () {
      this.communityID = await this.$router.currentRoute.value.params
        .communityID;
      this.items = await GetListingsInCommunity(this.communityID);
      for (var i = 0; i < this.items.length; i++) {
        let images = await getItemPictures(this.items[i].listingID);
        if (images.length > 0) {
          this.items[i].img = images[0].picture;
        }
      }
    },
    goToItemInfoPage(item) {
      this.$router.push("/item/" + item);
    },
    getItemPictures: async function (itemid) {
      let res = await getItemPictures(itemid);
      return res;
    },
    searchWritten: function () {
      //This method triggers when search input field is changed
      if (this.search.length > 0) {
        this.showItems = false;
        this.showSearchedItems = true;
      } else {
        this.showItems = true;
        this.showSearchedItems = false;
      }
    },

    //Pagination
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
      this.updateVisibleTodos();
    },
    updateVisibleTodos() {
      this.visibleItems = this.items.slice(
        this.currentPage * this.pageSize,
        this.currentPage * this.pageSize + this.pageSize
      );

      // if we have 0 visible items, go back a page
      if (this.visibleItems.length === 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1);
      }
    },
  },
  async beforeMount() {
    this.loading = true;
    await this.getCommunityFromAPI(); //To get the id of the community before mounting the view
    await this.getListingsOfCommunityFromAPI();
    this.updateVisibleTodos();
    this.loading = false;
  },
};
</script>
