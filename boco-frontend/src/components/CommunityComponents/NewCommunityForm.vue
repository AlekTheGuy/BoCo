<template>
  <!-- A form for creating a new community -->
  <div
    class="md:ring-1 ring-gray-300 rounded-xl overflow-hidden mx-auto mb-auto max-w-md w-full p-4"
  >
    <!-- Component heading -->
    <div
      class="text-xl md:text-2xl font-medium text-center text-gray-600 dark:text-gray-200 mt-4 mb-10"
    >
      Opprett ny gruppe
    </div>

    <!-- Radio boxes -->
    <div class="mt-6">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="radioBoxLabel"
        >Synlighet</label
      >
      <div class="form-check">
        <input
          class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-medium checked:border-primary-medium focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioOpen"
          value="Åpen"
          @change="checkRadioButton($event)"
          checked
        />
        <label
          class="form-check-label inline-block text-gray-800"
          for="flexRadioOpen"
          id="radioBoxOpenLabel"
        >
          Åpen
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-medium checked:border-primary-medium focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioPrivate"
          value="Privat"
          @change="checkRadioButton($event)"
        />
        <label
          class="form-check-label inline-block text-gray-800"
          for="flexRadioPrivate"
          id="radioBoxPrivateLabel"
        >
          Privat
        </label>
      </div>
    </div>

    <!-- Title -->
    <div class="mt-6" :class="{ error: v$.group.name.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="titleLabel"
        >Gruppenavn</label
      >
      <input
        type="text"
        id="title"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        v-model="v$.group.name.$model"
        required
      />

      <!-- error message for title-->
      <div
        class="text-error-medium"
        v-for="(error, index) of v$.group.name.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Place -->
    <div class="mt-6" :class="{ error: v$.group.place.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        id="positionLabel"
        >By/Sted</label
      >
      <input
        type="text"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        v-model="v$.group.place.$model"
        required
      />

      <!-- error message for place-->
      <div
        class="text-error-medium"
        v-for="(error, index) of v$.group.place.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="mt-6" :class="{ error: v$.group.description.$errors.length }">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="descriptionLabel"
        >Beskrivelse</label
      >
      <textarea
        id="description"
        rows="4"
        v-model="v$.group.description.$model"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
        required
      ></textarea>

      <!-- error message for description -->
      <div
        class="text-error-medium"
        v-for="(error, index) of v$.group.description.$errors"
        :key="index"
      >
        <div class="text-error-medium text-sm">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Images -->
    <div class="mt-6">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="imageLabel"
      >
        Bilde (bildet må være .png)
      </label>

      <input
        type="file"
        ref="file"
        style="display: none"
        @change="addImage"
        multiple
        accept="image/png"
      />

      <!-- Button for adding an image -->
      <div class="inline-flex rounded-md shadow-sm">
        <!--<div class="text-error uppercase text-center">Midlertidig fjernet</div> -->
        <button
          @click="$refs.file.click()"
          class="text-black bg-gray-200 hover:bg-grey-800 focus:ring-4 focus:outline-none focus:ring-grey-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-grey-600 dark:hover:bg-grey-700 dark:focus:ring-grey-800 disabled:opacity-50"
          :disabled="imageAdded"
        >
          Velg bilde
        </button>
      </div>

      <!-- Div box for showing all chosen images -->
      <div v-for="image in group.images" :key="image" class="m-2">
        <img :src="image" class="w-1/2 inline" alt="Bilde av gjenstanden" />
      </div>
    </div>

    <!-- Save item button -->
    <div class="flex justify-center mt-10 float-right">
      <Button @click="saveClicked" id="saveButton" :text="'Lagre'"> </Button>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, maxLength } from "@vuelidate/validators";
import { postNewgroup, postNewImageCommunity } from "@/utils/apiutil";
import Button from "@/components/BaseComponents/ColoredButton";

export default {
  name: "CreateNewGroup.vue",

  components: {
    Button,
  },
  setup() {
    return { v$: useVuelidate() };
  },

  validations() {
    return {
      group: {
        name: {
          required: helpers.withMessage(
            () => "Navn kan ikke være tom",
            required
          ),
          max: helpers.withMessage(
            () => `Navnet kan være på max 50 tegn`,
            maxLength(50)
          ),
        },
        place: {
          required: helpers.withMessage(
            () => "Stedsnavn kan ikke være tom",
            required
          ),
          max: helpers.withMessage(
            () => `Stednavn kan være på max 50 tegn`,
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
        },
      },
    };
  },
  data() {
    return {
      group: {
        name: "",
        description: "",
        images: [],
        radio: null,
        place: "",
        visibility: 1,
        image: "",
      },
      imageThere: false,
    };
  },
  computed: {
    imageAdded: function () {
      if (this.imageThere) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    checkRadioButton: function (event) {
      this.group.radio = event.target.value;

      if (this.group.radio == null || this.group.radio == "Åpen") {
        this.group.visibility = 1;
      } else {
        this.group.visibility = 0;
      }
    },
    checkValidation: function () {
      this.v$.group.$touch();
      if (this.v$.group.$invalid) {
        return false;
      }
      return true;
    },

    async saveClicked() {
      if (this.checkValidation()) {
        const groupInfo = {
          name: this.group.name,
          description: this.group.description,
          visibility: this.group.visibility,
          location: this.group.place,
          picture: this.group.image,
        };
        const respone = await postNewgroup(groupInfo);
        if (respone.status === 200 || respone.status === 201) {
          this.$store.commit("addAdmin", respone.data);
          this.$router.push({
            path: "/community/" + respone.data,
            replace: true,
          });
        }
      }
    },

    addImage: async function (event) {
      this.group.images.push(URL.createObjectURL(event.target.files[0]));

      var that = this;
      let image = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.onloadend = async function () {
        const res = fileReader.result;
        const id = await postNewImageCommunity(res);

        const API_URL = process.env.VUE_APP_BASEURL;
        that.group.image = API_URL + "images/" + id;
      };
      fileReader.readAsArrayBuffer(image);
      this.imageThere = true;
    },
  },
};
</script>
