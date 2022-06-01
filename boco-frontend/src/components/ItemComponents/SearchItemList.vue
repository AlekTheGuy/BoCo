<template>
  <!-- A template for searching in item list -->
  <section class="relative w-full max-w-md px-5 py-4 mx-auto rounded-md">
    <div class="relative" id="searchComponent">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </span>

      <input
        type="text"
        id="searchInput"
        class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-primary-medium dark:focus:border-primary-medium focus:outline-none focus:ring"
        placeholder="Søk"
        v-model="search"
      />
    </div>

    <div class="absolute inset-x-0 px-6 py-3 mt-4 border-2 border-slate-500">
      <div class="grid grid-cols-2">
        <ItemCard v-for="item in searchedItems" :key="item" :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import ItemCard from "@/components/ItemComponents/ItemCard";
export default {
  name: "SearchItemListComponent",

  components: {
    ItemCard,
  },

  computed: {
    searchedItems() {
      let filteredItems = [];

      filteredItems = this.items.filter(
        (p) =>
          p.title.toLowerCase().includes(this.search.toLowerCase()) ||
          p.adresse.toLowerCase().includes(this.search.toLowerCase()) ||
          p.price === Number(this.search)
      );

      return filteredItems;
    },
  },

  data() {
    return {
      items: [
        { img: "", adresse: "Oslo", title: "Dyson", price: 1000 },

        { img: "", adresse: "Trondheim", title: "Gressklipper", price: 500 },

        { img: "", adresse: "Bergen", title: "Bil", price: 500 },
      ],
      item: {
        img: "",
        adresse: "",
        title: "",
        price: 0,
      },
      search: "",
    };
  },
};
</script>
