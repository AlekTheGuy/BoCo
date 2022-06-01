<template>
  <!-- Pagination -->
  <div v-if="totalPages() > 0">
    <!-- Prev button -->
    <span
      v-if="showPreviousLink()"
      class="cursor-pointer inline-flex items-center p-2 text-sm font-medium text-primary-light bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
      @click="updatePage(currentPage - 1)"
    >
      Forrige
    </span>
    <!-- Current page -->
    <label class="mx-2 text-primary-light"
      >{{ currentPage + 1 }} av {{ totalPages() }}</label
    >
    <!-- Next button -->
    <span
      v-if="showNextLink()"
      class="cursor-pointer inline-flex items-center p-2 text-sm font-medium text-primary-light bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
      @click="updatePage(currentPage + 1)"
    >
      Neste
    </span>
  </div>
</template>

<script>
/**
 * Pagination component
 */
export default {
  name: "paginationTemplate",
  emits: ["page:update"],
  props: {
    items: Array,
    currentPage: Number,
    pageSize: Number,
  },
  methods: {
    /**
     * Calculates the number of pages to display whole list.
     */
    totalPages() {
      return Math.ceil(this.items.length / this.pageSize);
    },
    /**
     * Emits page update to parent.
     */
    updatePage(pageNumber) {
      this.$emit("page:update", pageNumber);
    },
    /**
     * Checks if previous button is needed.
     * Returns true if not on first page.
     */
    showPreviousLink() {
      return this.currentPage == 0 ? false : true;
    },
    /**
     * Checks if next button is needed.
     * Returns true if not on last page.
     */
    showNextLink() {
      return this.currentPage == this.totalPages() - 1 ? false : true;
    },
  },
};
</script>
