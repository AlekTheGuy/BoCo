<template>
  <!-- Main modal -->
  <div
    v-if="visible"
    class="fixed grid place-items-center bg-gray-600 bg-opacity-50 top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto inset-0 h-full"
  >
    <div class="relative w-full h-full max-w-2xl p-4 md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <!-- Close button -->
          <button
            @click="close()"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {{ message }}
          </p>
        </div>
        <!-- Modal footer -->
        <div class="rounded-b border-t border-gray-200 dark:border-gray-600">
          <!-- Slot: Add any html you want here (Must be one div) -->
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XIcon } from "@heroicons/vue/outline";

/**
 * CustomFooterModal component for adding buttons and such to the footer of the modals.
 * Buttons are added to slot so must be in a single div if multiple html elements are needed.
 */
export default {
  name: "CustomFooterModal",
  emits: ["close"],
  components: {
    XIcon,
  },
  props: {
    visible: Boolean,
    title: String,
    message: String,
  },
  methods: {
    /**
     * Method that emits close to parent.
     */
    close() {
      this.$emit("close");
    },
  },
};
</script>
