<template>
  <!-- Button -->
  <button
    class="flex items-center px-2 py-2 font-medium tracking-wide capitalize text-white transition-colors duration-200 transform rounded-md focus:outline-none focus:ring focus:ring-opacity-80"
    :class="color"
  >
    <div class="w-5 h-5 mx-1">
      <!-- Slot for icon (Default BanIcon) -->
      <slot><BanIcon /></slot>
    </div>
    <span class="mx-1">{{ text }}</span>
  </button>
</template>

<script>
import { BanIcon } from "@heroicons/vue/outline";

/**
 * IconButton component that can be customized with text, color and a slot for passing an icon.
 * Colors:
 * blue (default),
 * red,
 * green
 */
export default {
  name: "IconButton",
  props: {
    text: String,
    buttonColor: String,
  },
  components: {
    BanIcon,
  },
  computed: {
    /**
     * Formats the tailwind css tags based on the color passed from parent
     */
    color() {
      if (this.buttonColor === "red") {
        return "bg-error-medium hover:bg-error-dark focus:ring-error-light";
      }
      if (this.buttonColor === "green") {
        return "bg-success-medium hover:bg-success-dark focus:ring-success-light";
      }
      return "bg-primary-medium hover:bg-primary-dark focus:ring-primary-light";
    },
  },
};
</script>
