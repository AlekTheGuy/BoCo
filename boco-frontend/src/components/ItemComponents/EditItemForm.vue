<template>
  <!-- Form for editing an item -->
  <div
    class="md:ring-1 ring-gray-300 rounded-xl overflow-hidden mx-auto mb-auto max-w-md w-full p-4"
  >
    <!-- Component heading -->
    <h3 class="text-xl font-medium text-center text-primary-light mt-4 mb-8">
      Rediger gjenstand
    </h3>

    <!-- Title -->
    <div class="mb-6" :class="{ error: v$.updatedItem.title.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="titleLabel"
        >Tittel</label
      >
      <input
        type="text"
        id="title"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        v-model="v$.updatedItem.title.$model"
        required
      />

      <!-- error message for title-->
      <div
        class="text-error-medium"
        v-for="(error, index) of v$.updatedItem.title.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Category -->
    <div class="mb-6">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="selectCategoryLabel"
        >Kategori</label
      >
      <select
        @change="onChangeCategory($event)"
        v-model="v$.updatedItem.selectedCategory.$model"
        id="categories"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
      >
        <option class="text-gray-400" value="" disabled>
          Velg en kategori
        </option>
        <option
          :value="category"
          :selected="category == updatedItem.selectedCategory"
          v-for="category in categories"
          :key="category"
          class="text-gray-900 text-sm"
        >
          {{ category }}
        </option>
      </select>

      <!-- error message for select box -->
      <div
        class="text-error-medium"
        v-for="(error, index) of v$.updatedItem.selectedCategory.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Grupper -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-900 dark:text-gray-400"
        >Grupper</label
      >
      <div
        class="overflow-auto w-full max-h-32 mt-2 text-base list-none bg-white rounded divide-y divide-gray-100 dark:bg-gray-700"
      >
        <ul class="py-1" aria-labelledby="dropdownDefault">
          <li>
            <div
              class="form-check"
              v-for="community in communities"
              :key="community"
            >
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary-medium focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                :checked="isInSelectedCommunity(community.communityId)"
                :value="community.communityId"
                @change="onChangeCommunity($event)"
              />
              <label class="form-check-label inline-block text-gray-800">
                {{ community.name }}
              </label>
            </div>
          </li>
        </ul>
      </div>
      <label class="text-error-medium text-sm block">{{
        communityErrorMessage
      }}</label>
    </div>

    <!-- price -->
    <div
      class="mb-6 mt-4"
      :class="{ error: v$.updatedItem.price.$errors.length }"
    >
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="priceLabel"
        >Pris</label
      >
      <input
        type="number"
        v-model="v$.updatedItem.price.$model"
        id="price"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        required
      />

      <!-- error message for price -->
      <div
        class="text-error"
        v-for="(error, index) of v$.updatedItem.price.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Description -->
    <div
      class="mb-6"
      :class="{ error: v$.updatedItem.description.$errors.length }"
    >
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="descriptionLabel"
        >Beskrivelse</label
      >
      <textarea
        id="description"
        rows="4"
        v-model="v$.updatedItem.description.$model"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        required
      ></textarea>

      <!-- error message for description -->
      <div
        class="text-error"
        v-for="(error, index) of v$.updatedItem.description.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Address -->
    <div class="mb-6" :class="{ error: v$.updatedItem.address.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="addressLabel"
        >Adresse</label
      >
      <input
        type="text"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        v-model="v$.updatedItem.address.$model"
        id="adress"
        required
      />

      <!-- error message for address-->
      <div
        class="text-error"
        v-for="(error, index) of v$.updatedItem.address.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Images -->
    <div>
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="imageLabel"
      >
        Legg til flere bilder (bildene må være .png)
      </label>

      <input
        type="file"
        ref="file"
        style="display: none"
        @change="addImage"
        accept="image/png"
      />

      <ColoredButton :text="'Velg bilde'" @click="$refs.file.click()" />

      <div v-for="image in updatedItem.images" :key="image" class="m-2">
        <form-image-display :image="image" @remove="removeImage(image)" />
      </div>
    </div>

    <!-- Save item button -->
    <div class="float-right">
      <ColoredButton :text="'Lagre'" @click="saveClicked" id="saveButton" />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import ColoredButton from "@/components/BaseComponents/ColoredButton";
import FormImageDisplay from "@/components/BaseComponents/FormImageDisplay.vue";
import ListingService from "@/services/listing.service";
import CommunityService from "@/services/community.service";
import ImageService from "@/services/image.service";
import { parseCurrentUser } from "@/utils/token-utils";

import {
  required,
  helpers,
  maxLength,
  between,
  minLength,
} from "@vuelidate/validators";

export default {
  name: "EditNewItem",

  components: {
    ColoredButton,
    FormImageDisplay,
  },

  setup() {
    return { v$: useVuelidate() };
  },

  validations() {
    return {
      updatedItem: {
        title: {
          required: helpers.withMessage(
            () => "Tittelen kan ikke være tom",
            required
          ),
          max: helpers.withMessage(
            () => `Tittelen kan inneholde max 50 tegn`,
            maxLength(50)
          ),
        },
        description: {
          required: helpers.withMessage(
            () => "Beskrivelsen kan ikke være tom",
            required
          ),
          max: helpers.withMessage(
            () => `Beskrivelsen kan inneholde max 200 tegn`,
            maxLength(200)
          ),
          min: helpers.withMessage(
            () => `Beskrivelsen kan ikke være tom`,
            minLength(0)
          ),
        },
        price: {
          required,
          between: helpers.withMessage(
            () => `Leieprisen kan ikke være større enn 25000`,
            between(0, 25000)
          ),
        },
        selectedCategory: {
          required: helpers.withMessage(() => `Velg en kategori`, required),
        },
        address: {
          required: helpers.withMessage(
            () => "Addressen kan ikke være tom",
            required
          ),
          max: helpers.withMessage(
            () => `Addressen kan inneholde max 50 tegn`,
            maxLength(50)
          ),
        },
      },
    };
  },

  data() {
    return {
      updatedItem: {
        title: "",
        description: "",
        address: "",
        price: "",
        category: "",
        selectedCategory: "",
        selectedCategories: [],
        userId: -1,
        selectedCommunityId: -1,
        selectedCommunities: [],
        images: [],
      },
      categories: [
        "Antikviteter og kunst",
        "Dyr og utstyr",
        "Elektronikk og hvitevarer",
        "Foreldre og barn",
        "Fritid, hobby og underholdning",
        "Hage, oppussing og hus",
        "Klær, kosmetikk og tilbehør",
        "Møbler og interiør",
        "Næringsvirksomhet",
        "Sport og friluftsliv",
        "Utstyr til bil, båt og MC",
      ],
      initialItem: {},
      communities: [],
      communityErrorMessage: "",
      images: [],
    };
  },

  methods: {
    checkValidation() {
      this.v$.updatedItem.$touch();
      if (
        this.v$.updatedItem.$invalid ||
        this.updatedItem.selectedCommunities.length === 0
      ) {
        if (this.updatedItem.selectedCommunities.length === 0) {
          this.communityErrorMessage = "Velg gruppe/grupper";
        }
        return false;
      }
      return true;
    },

    /**
     * Validation gets checked, and if it returns true
     * the item and the images gets updated.
     */
    async saveClicked() {
      if (this.checkValidation()) {
        let itemInfo = {
          listingID: parseInt(this.initialItem.listingID),
          title: this.updatedItem.title,
          description: this.updatedItem.description,
          pricePerDay: this.updatedItem.price,
          address: this.updatedItem.address,
          userID: this.updatedItem.userId,
          categoryNames: this.updatedItem.selectedCategories,
          communityIDs: this.updatedItem.selectedCommunities,
        };
        await ListingService.putItem(itemInfo);
        await ImageService.putListingImages(
          this.initialItem.listingID,
          this.updatedItem.images
        );
        this.$router.push("/item/" + this.initialItem.listingID);
      }
    },

    /**
     * Adds image when an image is selected from file explorer.
     * Posts it to the db and gets the id of the image posted in return.
     * Adds that id to an image URL and saves it in an array.
     * That array containing image URLs gets posted to the db when save is clicked.
     */
    async addImage(event) {
      var that = this;
      let image = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.onloadend = async function () {
        const res = fileReader.result;
        const id = await ImageService.postNewImage(res);

        const API_URL = process.env.VUE_APP_BASEURL;
        that.updatedItem.images.push(API_URL + "images/" + id);
      };
      fileReader.readAsArrayBuffer(image);
    },

    /**
     * Runs every time a chech box under 'grupper' is changed(checked/unchecked).
     * Finds out if it was checked or unchecked and adds/removes the community from
     * the array based on that.
     */
    onChangeCommunity(e) {
      this.updatedItem.selectedCommunityId = e.target.value;
      let alreadyInGroupList = false;

      for (let i = 0; i <= this.updatedItem.selectedCommunities.length; i++) {
        if (
          this.updatedItem.selectedCommunityId ==
          this.updatedItem.selectedCommunities[i]
        ) {
          const index = this.updatedItem.selectedCommunities.indexOf(
            this.updatedItem.selectedCommunityId
          );
          if (index > -1) {
            this.updatedItem.selectedCommunities.splice(index, 1);
          }
          alreadyInGroupList = true;
        }
      }

      if (!alreadyInGroupList) {
        this.updatedItem.selectedCommunities.push(
          this.updatedItem.selectedCommunityId
        );
        this.communityErrorMessage = "";
      }
    },

    /**
     * Updates the selected category when it gets changed changes.
     */
    onChangeCategory(e) {
      this.updatedItem.selectedCategory = e.target.value;
      this.updatedItem.selectedCategories = [e.target.value];
    },

    /**
     * pre-selects (check marks) the community/communities the item
     * is posted in so the user can see where the item already is posted and
     * then change the community/communities
     */
    isInSelectedCommunity(id) {
      for (let i in this.updatedItem.selectedCommunities) {
        if (this.updatedItem.selectedCommunities[i] == id) {
          return true;
        }
      }
      return false;
    },

    /**
     * Removes image from item
     */
    async removeImage(image) {
      let newImages = [];
      for (let i in this.updatedItem.images) {
        if (this.updatedItem.images[i] != image) {
          newImages.push(this.images[i]);
        }
      }
      this.updatedItem.images = newImages;
    },
  },

  /**
   * Gets the item before the page gets mounted so the item info
   * is filled in and ready to be displayed to user.
   */
  async beforeCreate() {
    let itemID = await this.$router.currentRoute.value.params.id;
    let item = await ListingService.getItem(itemID);

    // Check if user is the owner of the item
    let userID = await parseCurrentUser().userId;
    if (item.userID == userID) {
      this.$router.push(this.$router.options.history.state.back);
    }

    this.initialItem = item;
    this.communities = await CommunityService.getUserCommunities();

    this.images = await ListingService.getItemPictures(itemID);
    let imageURLS = [];
    for (let i in this.images) {
      imageURLS.push(this.images[i].picture);
    }

    let initialCategories = [];
    for (let i in this.initialItem.categoryNames) {
      initialCategories.push(this.initialItem.categoryNames[i]);
    }
    let selectedCategory =
      initialCategories.length > 0 ? initialCategories[0] : "";

    let initialCommunities = [];
    for (let i in this.initialItem.communityIDs) {
      initialCommunities.push(this.initialItem.communityIDs[i]);
    }

    this.updatedItem = {
      title: this.initialItem.title,
      description: this.initialItem.description,
      address: this.initialItem.address,
      price: this.initialItem.pricePerDay,
      selectedCategories: initialCategories,
      selectedCategory: selectedCategory,
      images: imageURLS,
      userId: this.initialItem.userID,
      selectedCommunityId: 0,
      selectedCommunities: initialCommunities,
    };
  },
};
</script>
