<template>
  <!-- Shows rating, if no rating found, tells the user that no rating is registered -->
  <ul v-if="isNaN(rating)" class="flex justify-center">
    <li>
      <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {{ ratingType }}:&nbsp;
      </p>
    </li>
    <li>
      <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        Ingen vurderinger
      </p>
    </li>
  </ul>
  <ul v-else class="flex justify-center">
    <li>
      <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {{ ratingType }}:&nbsp;
      </p>
    </li>
    <li v-for="i in 5" :key="i">
      <svg
        :class="getFill(i)"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        ></path>
      </svg>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RatingComponent",
  props: {
    rating: Number,
    ratingType: String,
  },
  methods: {
    //Fills the rating stars
    getFill(i) {
      if (i <= Math.round(this.rating)) {
        return "w-5 h-5 text-warn-medium";
      }
      return "w-5 h-5 text-gray-300 dark:text-gray-500";
    },
  },
};
</script>
