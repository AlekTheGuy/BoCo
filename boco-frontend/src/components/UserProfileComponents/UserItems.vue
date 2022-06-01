<template>
  <!-- Shows all the items a user has posted with search and pagination.
       Includes a dropdown menu for editing or deleting an item. -->
  <div id="headline" class="text-xl md:text-2xl text-primary-light font-medium">
    Mine gjenstander
  </div>
  <!-- Search field -->
  <div class="relative mx-4" id="searchComponent">
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
      id="searchInput"
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
        <div
          class="cardContainer"
          id="item"
          v-for="item in visibleItems"
          :key="item"
        >
          <div class="w-full">
            <ItemCard
              id="ItemCardPage"
              class="ItemCard w-full h-full"
              :item="item"
            />
          </div>

          <!-- Dropdown menu with options for editing an item and deleting an item -->
          <TripleDotButton class="DotButton" @click="openDotMenu(item)" />

          <div
            v-show="item.toggle"
            class="options z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 pt-4 pl-12"
          >
            <ul
              class="py-1 absolute bg-white ring-1 ring-gray-300 rounded-xl"
              aria-labelledby="dropdownDefault"
            >
              <li>
                <button
                  @click="
                    this.$router.push('/item/' + item.listingID + '/edit')
                  "
                  class="editButton block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Rediger gjenstand
                </button>
              </li>
              <li>
                <button
                  @click="goToDeleteItem(item.listingID)"
                  class="deleteButton block py-2 px-4 text-sm text-error-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Slett gjenstand
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- A waring asking the user if it is sure it wants to delete the item
             with options to go ahead with the deleting or to cancel the delete. -->
        <CustomFooterModal
          @close="this.readyToDelete = false"
          :visible="readyToDelete"
          :title="'Sikker på at du vil slette annonsen?'"
          :message="''"
        >
          <div class="flex justify-center p-2">
            <ColoredButton
              id="#cancelDeleteButton1"
              :text="'Avbryt'"
              @click="cancelDelete"
              class="bg-gray-500 m-2"
            ></ColoredButton>

            <ColoredButton
              id="confirmDeleteButton1"
              @click="deleteItem"
              :text="'Slett'"
              class="confirmDelete m-2 bg-error-medium"
            >
            </ColoredButton>
          </div>
        </CustomFooterModal>
      </div>

      <!-- Shows items based on search field input -->
      <div
        class="grid grid-flow-row-dense grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full"
        v-if="showSearchedItems"
      >
        <div
          class="cardContainer"
          id="item"
          v-for="item in searchedItems"
          :key="item"
        >
          <div class="w-full">
            <ItemCard
              id="ItemCardSearch"
              class="ItemCard w-full h-full"
              :item="item"
            />
          </div>

          <!-- Dropdown menu with options for editing an item and deleting an item -->
          <TripleDotButton class="DotButton" @click="openDotMenu(item)" />
          <div
            v-show="item.toggle"
            class="options z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          >
            <ul
              class="py-1 absolute bg-white ring-1 ring-gray-300 rounded-xl"
              aria-labelledby="dropdownDefault"
            >
              <li>
                <button
                  @click="
                    this.$router.push('/item/' + item.listingID + '/edit')
                  "
                  class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Rediger gjenstand
                </button>
              </li>
              <li>
                <button
                  @click="goToDeleteItem(item.listingID)"
                  class="block py-2 px-4 text-sm text-error-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Slett gjenstand
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- A waring asking the user if it is sure it wants to delete the item
             with options to go ahead with the deleting or to cancel the delete. -->
        <CustomFooterModal
          @close="this.readyToDelete = false"
          :visible="readyToDelete"
          :title="'Sikker på at du vil slette annonsen?'"
          :message="''"
        >
          <div class="flex justify-center p-2">
            <ColoredButton
              id="cancelDeleteButton"
              :text="'Avbryt'"
              @click="cancelDelete"
              class="bg-gray-500 m-2"
            ></ColoredButton>

            <ColoredButton
              id="confirmDeleteButton"
              @click="deleteItem"
              :text="'Slett'"
              class="m-2 bg-error-medium"
            >
            </ColoredButton>
          </div>
        </CustomFooterModal>
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
</template>
<script>
import TripleDotButton from "@/components/BaseComponents/TripleDotButton.vue";
import ColoredButton from "@/components/BaseComponents/ColoredButton.vue";
import ItemCard from "@/components/ItemComponents/ItemCard.vue";
import PaginationTemplate from "@/components/BaseComponents/PaginationTemplate";
import CustomFooterModal from "@/components/BaseComponents/CustomFooterModal.vue";

import UserService from "@/services/user.service";
import listingService from "@/services/listing.service";

export default {
  name: "UserItems",
  components: {
    ItemCard,
    TripleDotButton,
    PaginationTemplate,
    CustomFooterModal,
    ColoredButton,
  },
  data() {
    return {
      items: [],
      item: {
        listingID: 0,
        img: "",
        address: "",
        title: "",
        pricePerDay: 0,
        toggle: false,
      },
      chosenItem: null,
      showItems: true,
      showSearchedItems: false,
      search: "",
      readyToDelete: false,
      dropdown: false,

      //Variables connected to pagination
      currentPage: 0,
      pageSize: 12,
      visibleItems: [],
    };
  },
  computed: {
    /**
     * Searchs items based on their title, address and price per day.
     */
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
  methods: {
    openDotMenu(item) {
      if (item.toggle == false) {
        for (var i = 0; i < this.visibleItems.length; i++) {
          this.visibleItems[i].toggle = false;
        }
        item.toggle = true;
      } else {
        item.toggle = false;
      }
    },
    getUserListingsFromAPI: async function () {
      this.items = await UserService.getUserListings();
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].toggle = false;
        let images = await listingService.getItemPictures(
          this.items[i].listingID
        );
        if (images.length > 0) {
          this.items[i].img = images[0].picture;
        }
      }
    },
    cancelDelete() {
      this.readyToDelete = false;
    },
    /**
     * 2 methods related to pagination. Updates page and updates
     * visible items on page.
     */
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

    goToDeleteItem(item) {
      this.chosenItem = item;
      this.readyToDelete = true;
    },
    async deleteItem() {
      await UserService.setListingToDeleted(this.chosenItem);
      this.$router.go(0);
    },

    /**
     * This method triggers when search input field is changed
     */
    searchWritten: function () {
      if (this.search.length > 0) {
        this.showItems = false;
        this.showSearchedItems = true;
      } else {
        this.showItems = true;
        this.showSearchedItems = false;
      }
    },
  },

  /**
   * Gets userlistings and prepares the pagination by
   * updating the items to be visible.
   */
  async beforeMount() {
    await this.getUserListingsFromAPI();
    this.updateVisibleTodos();
  },
};
</script>

<style>
#headline {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
}
.cardContainer {
  position: relative;
}

.DotButton {
  position: absolute;
  right: 40px;
  bottom: 10px;
}
.options {
  position: absolute;
}
</style>
