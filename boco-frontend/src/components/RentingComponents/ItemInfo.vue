<template>
  <div>
    <new-rent v-if="confirm" :newRentBox="pushItem"> </new-rent>
  </div>
  <div v-if="!confirm">
    <div>
      <div v-if="noPicture" class="md:grid md:place-items-center md:h-screen">
        <img
          :src="require('@/assets/default-product.png')"
          alt="No image found"
        />
      </div>
      <div v-else>
        <ImageCarousel :images="pictures"></ImageCarousel>
      </div>
    </div>
    <!-- Product info -->
    <div
      class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
    >
      <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1
          class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
        >
          {{ item.title }}
        </h1>
      </div>
      <!-- TODO make this component render elements differently depending on screen size -->
      <div
        class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"
      >
        <!-- Description and details -->
        <div>
          <h3 class="text-base font-semibold text-gray-900">Pris per dag</h3>

          <div class="space-y-6">
            <p class="text-2xl font-medium text-gray-900">
              {{ item.pricePerDay }} kr
            </p>
          </div>
        </div>
        <div>
          <div class="mt-4 space-y-6">
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </div>
        </div>
        <div>
          <div class="mt-4 space-y-6">
            <p class="text-base font-semibold text-gray-900">
              {{ item.address }}
            </p>
          </div>
        </div>
        <div class="mt-2" v-if="userForId">
          <UserListItemCard
            :buttons="['chat']"
            :user="userForId"
            :rating="rating"
          ></UserListItemCard>
        </div>
        <div class="mt-4">
          <h3 class="text-base font-base text-gray-900">Tidspunkter</h3>

          <div>
            <p class="text-sm text-gray-900">
              <DatepickerRange
                @value="setDate"
                :messageOnDisplay="dateMessage"
                :blockedDaysRange="nonAvailableTimes"
              ></DatepickerRange>
            </p>
          </div>
        </div>
        <div class="mt-2 md:col-span-1">
          <div class="mt-2 space-y-2">
            <p class="text-xl font-semibold text-gray-900">
              Total pris: {{ totPrice }} kr
            </p>
            <p v-if="error" class="text-error-medium">Dato er påkrevd</p>
            <button
              class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-500 rounded-md focus:outline-none focus:ring focus:ring-opacity-80"
              v-bind:class="{ colorChange: allowForRent }"
              @click="sendToConfirm"
            >
              <!-- This button should send you to the rent page -->
              Rent now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewRent from "@/components/RentingComponents/NewRent.vue";
import {
  getItem,
  getItemPictures,
  getAvailableTimesForListing,
} from "@/utils/apiutil";
import ImageCarousel from "@/components/RentingComponents/ImageCarousel.vue";
import UserListItemCard from "@/components/UserProfileComponents/UserListItemCard.vue";
import DatepickerRange from "@/components/TimepickerComponents/DatepickerRange/DatepickerRange.vue";
import UserService from "@/services/user.service";

export default {
  name: "ItemInfo",
  data() {
    return {
      confirm: false,
      error: false,
      item: {
        listingID: 0,
        title: "",
        description: "",
        pricePerDay: 0,
        price: this.totPrice,
        address: "",
        userID: 0,
        categoryNames: [],
        communityIDs: [],
      },
      pushItem: {
        listingID: 157,
        title: "Heii",
        price: 56,
        fromTime: "",
        toTime: "",
      },
      images: [
        {
          listingID: 0,
          picture: "",
        },
      ],
      pictures: [],
      noPicture: true,
      userForId: {},
      rentingStartDate: null,
      rentingEndDate: null,
      totPrice: 0,
      dateMessage: "Venligst velg dato for leieperioden",
      allowForRent: false,
      nonAvailableTimes: [],
      rating: 0,
    };
  },
  components: {
    ImageCarousel,
    UserListItemCard,
    DatepickerRange,
    NewRent,
  },
  methods: {
    sendToConfirm() {
      if (this.allowForRent) {
        this.confirm = true;
        this.createPushItem();
      } else {
        this.error = true;
      }
    },
    createPushItem() {
      this.pushItem.listingID = this.item.listingID;
      this.pushItem.fromTime = this.rentingStartDate;
      this.pushItem.toTime = this.rentingEndDate;
      this.pushItem.title = this.item.title;
      this.pushItem.price = this.totPrice;
      this.pushItem.renterId = this.item.userID;
    },
    async getItem() {
      let id = this.$router.currentRoute.value.params.id;
      this.item = await getItem(id);
      this.item.listingID = id;
      this.totPrice = this.item.pricePerDay;
    },
    async getItemPictures() {
      let id = this.$router.currentRoute.value.params.id;
      this.images = await getItemPictures(id);

      if (this.images.length > 0) {
        this.noPicture = false;
        for (let i = 0; i < this.images.length; i++) {
          let oneImage = {
            src: this.images[i].picture,
            //How do i make this accurate to the image?
            alt: "An image",
          };
          this.pictures.push(oneImage);
        }
      }
      //TODO fixs so each image get a correct alt text.
    },
    async getUser(userId) {
      this.userForId = await UserService.getUserFromId(userId);
    },
    async getAvailableTimesForListing() {
      let datesTakenInMilliseconds = await getAvailableTimesForListing(
        this.item.listingID
      );
      for (var i = 0; i < datesTakenInMilliseconds.length; i++) {
        let oneArray = datesTakenInMilliseconds[i];
        let bigArray = [];
        let startDate = new Date(oneArray[0]);
        let endDate = new Date(oneArray[1]);
        bigArray.push(startDate);
        bigArray.push(endDate);
        this.nonAvailableTimes.push(bigArray);
      }
    },
    setDate(dateOfsomthing) {
      if (dateOfsomthing.startDate == null || dateOfsomthing.endDate == null) {
        this.totPrice = this.item.pricePerDay;
        this.allowForRent = false;
      } else {
        this.rentingStartDate = dateOfsomthing.startDate;
        this.rentingEndDate = dateOfsomthing.endDate;
        this.calculateTotPrice();
        this.allowForRent = true;
        this.error = false;
      }
    },
    calculateTotPrice() {
      let amountOfDays = this.rentingEndDate - this.rentingStartDate;
      amountOfDays = Math.ceil(amountOfDays / 86400000);
      this.totPrice = this.item.pricePerDay * amountOfDays;
    },
    async getUserRating() {
      let maybeRating = await UserService.getUserRatingAverage(
        this.userForId.userId
      );
      if (isNaN(maybeRating)) {
        this.rating = NaN;
      } else {
        this.rating = maybeRating;
        if (this.rating > 5) this.rating = 5;
        else if (this.rating < 1) this.rating = 1;
      }
    },
  },
  async created() {
    await this.getItemPictures();
    await this.getItem();
    await this.getUser(this.item.userID);
    await this.getUserRating();
    await this.getAvailableTimesForListing();
  },
};
</script>

<style>
.colorChange {
  background-color: #004aad;
}

.colorChange:hover {
  background-color: #306ec1;
}
</style>
