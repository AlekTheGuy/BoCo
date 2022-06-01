<template>
  <!-- Item card, displays title, address, price per day and a picture -->
  <div class="mt-5 px-5">
    <div
      class="w-full h-full rounded bg-gray-100 ring-1 ring-gray-200 overflow-hidden display:inline-block correct-size cursor-pointer"
    >
      <div class="relative h-0 pb-[66.7%]">
        <img
          class="w-full h-full object-contain absolute"
          :src="item.img || require('../../assets/default-product.png')"
          alt="Item image"
        />
      </div>
      <div class="p-1 m-1 bottom-0">
        <p class="font-bold text-sm" id="title">{{ item.title }}</p>
        <p class="text-gray-700 text-xs" id="price">
          {{ item.pricePerDay }} kr
        </p>
        <p class="text-gray-700 text-xs font-bold" id="adress">
          {{ item.address }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      img: String,
      address: String,
      title: String,
      pricePerDay: Number,
    },
  },
};
</script>
