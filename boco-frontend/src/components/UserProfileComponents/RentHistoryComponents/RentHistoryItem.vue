<template>
  <!-- A card for a rent history containing the item's title,
       name of the person who rented it, dates/renting period, and a button
       to rate if not already rated it. -->
  <div
    class="bg-white shadow dark:bg-gray-800 select-none cursor-pointer hover:bg-gray-50"
  >
    <!-- Title -->
    <p class="font-bold mx-4" id="title">
      {{ historyItem.listing.title }}
    </p>

    <!-- Name of the user who rented -->
    <div class="flex flex-row items-center">
      <div class="flex flex-col px-4 flex-1">
        <router-link :to="{ path: '/profile/' + user.userId }">
          Leid til: {{ user.firstName }} {{ user.lastName }}
        </router-link>
      </div>

      <!-- Period it was rented for -->
      <div class="flex flex-col flex-1">
        <div>
          Fra:
          {{ this.getDateString(historyItem.fromTime, isMultipleDays) }}
        </div>
        <div>
          Til: {{ this.getDateString(historyItem.toTime, isMultipleDays) }}
        </div>
      </div>

      <!-- Button to rate -->
      <colored-button
        v-if="!isRated"
        :text="'Vurder'"
        class="px-4 flex-1"
        @click="
          $emit('rate', {
            show: true,
            name: user.firstName + ' ' + user.lastName,
            title: historyItem.listing.title,
            rentID: historyItem.rentId,
            renterIsReceiverOfRating: !currentUserIsRenter,
          })
        "
      />
    </div>
  </div>
</template>

<script>
import ColoredButton from "@/components/BaseComponents/ColoredButton.vue";
import { parseCurrentUser } from "@/utils/token-utils";
import userService from "@/services/user.service";

export default {
  name: "RentHistoryItem",
  components: {
    ColoredButton,
  },
  data() {
    return {
      user: {},
      isRated: true,
    };
  },
  props: {
    historyItem: {
      rentId: Number,
      fromTime: Number,
      toTime: Number,
      isAccepted: Boolean,
      listing: {
        listingID: Number,
        title: String,
        pricePerDay: Number,
        address: String,
        userID: Number,
      },
      renterId: Number,
    },
  },
  computed: {
    currentUser() {
      return parseCurrentUser();
    },
    //Checks if the rent period was multiple days or not
    isMultipleDays() {
      if (this.historyItem.toTime - this.historyItem.fromTime < 86400000) {
        return false;
      }
      return true;
    },
    /**
     * computed the total price based on how long the renting period was.
     */
    price() {
      if (this.isMultipleDays) {
        let numDays = Math.round(
          (this.historyItem.toTime - this.historyItem.fromTime) / 86400000
        );
        return this.historyItem.listing.pricePerDay * numDays;
      }
      return this.historyItem.listing.pricePerDay;
    },
    /**
     * Checks if the user rented its own item
     */
    currentUserIsRenter() {
      return this.isCurrentUser(this.historyItem.renterId);
    },
  },
  methods: {
    /**
     * returns a date as a string
     */
    getDateString(milliseconds) {
      let today = new Date();
      let date = new Date(milliseconds);
      const shortMonthOfRentHistoryItem = date.toLocaleString("default", {
        month: "short",
      });
      let dateString = date.getDate() + ". " + shortMonthOfRentHistoryItem;

      if (date.getFullYear() != today.getFullYear()) {
        dateString += "." + date.getFullYear();
      }
      return dateString;
    },
    isCurrentUser(id) {
      return id == this.currentUser.accountId;
    },
  },
  /**
   * Gets the user and checks if a rating is saved, before mounting the page.
   */
  async beforeCreate() {
    if (this.currentUserIsRenter) {
      this.user = await userService.getUserFromId(
        this.historyItem.listing.userID
      );
    } else {
      this.user = await userService.getUserFromId(this.historyItem.renterId);
    }
    this.isRated = await userService.isRated(this.historyItem.rentId);
  },
};
</script>
