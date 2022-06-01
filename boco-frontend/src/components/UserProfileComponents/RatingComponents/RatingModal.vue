<template>
  <!-- Main modal for rating -->
  <div
    v-if="visible"
    class="fixed grid place-items-center bg-gray-600 bg-opacity-50 top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto inset-0 h-full"
  >
    <div class="relative w-full h-full max-w-2xl p-4 md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ name }}
          </h3>
          <button
            @click="close()"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p class="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
            {{ title }}
          </p>
        </div>

        <div class="ml-6 mt-4">
          <p
            class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            v-show="renterIsReceiverOfRating"
          >
            Gi en vurdering til utleieren
          </p>
          <p
            class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            v-show="!renterIsReceiverOfRating"
          >
            Gi en vurdering til leietakeren
          </p>
        </div>

        <div class="flex justify-center px-4">
          <textarea
            class="w-full h-40 bg-gray-200 mb-4 ring-1 ring-gray-400 rounded-xl"
          />
        </div>

        <!-- 5 rating stars -->
        <div class="flex items-center justify-center mb-8">
          <StarIcon :class="getStarType(0)" @click="setRating(1)"> </StarIcon>
          <StarIcon :class="getStarType(1)" @click="setRating(2)"> </StarIcon>
          <StarIcon :class="getStarType(2)" @click="setRating(3)"> </StarIcon>
          <StarIcon :class="getStarType(3)" @click="setRating(4)"> </StarIcon>
          <StarIcon :class="getStarType(4)" @click="setRating(5)"> </StarIcon>
        </div>

        <!-- Button for submitting the rating -->
        <div class="flex justify-center mb-4">
          <ColoredButton
            :text="'Send en vurdering'"
            @click="sendRating"
          ></ColoredButton>
        </div>

        <!-- Modal footer -->
        <div class="rounded-b border-t border-gray-200 dark:border-gray-600">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColoredButton from "@/components/BaseComponents/ColoredButton";
import { postNewRating } from "@/utils/apiutil";
import { XIcon } from "@heroicons/vue/outline";
import { StarIcon } from "@heroicons/vue/solid";

export default {
  name: "RatingModal",
  emits: ["close", "reload"],
  data() {
    return {
      score: 3,
      comment: "",
      rating: [
        "text-warn-medium",
        "text-warn-medium",
        "text-warn-medium",
        "text-gray-300",
        "text-gray-300",
      ],
    };
  },
  props: {
    visible: Boolean,
    name: String,
    title: String,
    rentID: Number,
    renterIsReceiverOfRating: Boolean,
  },

  components: {
    XIcon,
    ColoredButton,
    StarIcon,
  },
  methods: {
    //A method for setting the rating
    setRating(ratingNumber) {
      this.score = ratingNumber;
      for (let i = 0; i < 5; i++) {
        if (i < ratingNumber) {
          this.rating[i] = "text-warn-medium";
        } else {
          this.rating[i] = "text-gray-300";
        }
      }
    },
    getStarType(n) {
      return "w-10 h-10 cursor-pointer " + this.rating[n];
    },
    close() {
      this.$emit("close");
    },
    /**
     * A method for sending the rating when button is clicked.
     * It posts the rating to the db.
     */
    async sendRating() {
      const ratingInfo = {
        score: this.score,
        comment: this.comment,
        renterIsReceiverOfRating: this.renterIsReceiverOfRating,
        rentID: this.rentID,
      };

      await postNewRating(ratingInfo);
      this.$emit("reload");
      this.$router.go(0);
    },
  },
};
</script>
