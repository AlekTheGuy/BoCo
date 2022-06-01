<template>
  <button
    id="dropdownDefault"
    data-dropdown-toggle="dropdown"
    class="w-10 h-10 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg float-right text-sm p-1.5"
    type="button"
  >
    <DotsVerticalIcon class="w-6 h-6" />
  </button>
</template>
<script>
import { DotsVerticalIcon } from "@heroicons/vue/outline";

/**
 * Triple dot button
 */
export default {
  name: "TripleDotButton",
  components: {
    DotsVerticalIcon,
  },
};
</script>
