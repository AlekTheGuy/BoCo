<template>
  <!-- A view for showing rating and rent history -->
  <rating-modal
    :visible="modal.show"
    :name="modal.name"
    :title="modal.title"
    :rentID="modal.rentID"
    :renterIsReceiverOfRating="modal.renterIsReceiverOfRating"
    @close="modal.show = false"
    @reload="this.$forceUpdate()"
  />
  <ul>
    <li v-for="historyItem in fullHistory" :key="historyItem.rentId">
      <rent-history-item
        :historyItem="historyItem"
        @rate="(modal) => openModal(modal)"
      />
    </li>
  </ul>
</template>

<script>
import RentHistoryItem from "@/components/UserProfileComponents/RentHistoryComponents/RentHistoryItem.vue";
import RatingModal from "@/components/UserProfileComponents/RatingComponents/RatingModal.vue";
import UserService from "@/services/user.service";

export default {
  components: {
    RentHistoryItem,
    RatingModal,
  },
  data() {
    return {
      renterHistory: [],
      ownerHistory: [],
      modal: {
        show: false,
        name: "",
        title: "",
        rentID: -1,
        renterIsReceiverOfRating: false,
      },
    };
  },
  computed: {
    fullHistory() {
      function compareHistoryItems(itemA, itemB) {
        if (itemA.fromTime > itemB.fromTime) {
          return -1;
        }
        if (itemA.fromTime < itemB.fromTime) {
          return 1;
        }
        return 0;
      }

      let fullHistory = this.renterHistory.concat(this.ownerHistory);
      fullHistory.filter((item) => item.isAccepted);
      fullHistory.sort(compareHistoryItems);
      return fullHistory;
    },
  },
  methods: {
    openModal(modal) {
      this.modal = modal;
    },
  },
  async beforeCreate() {
    this.renterHistory = await UserService.getRenterHistory();
    this.ownerHistory = await UserService.getOwnerHistory();
  },
};
</script>
