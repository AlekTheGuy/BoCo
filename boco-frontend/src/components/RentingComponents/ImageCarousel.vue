<template>
  <div
    id="carouselIndicators"
    class="carousel slide relative"
    data-bs-ride="carousel"
  >
    <div
      v-if="setButtons"
      class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4"
    >
      <button
        v-for="(image, i) in images"
        :key="i"
        type="button"
        data-bs-target="#carouselIndicators"
        :data-bs-slide-to="i"
        :class="{ active: i === 0 }"
        :aria-current="i === 0 ? 'true' : 'false'"
        :aria-label="'Slide ' + (i + 1)"
      ></button>
    </div>
    <div class="carousel-inner relative w-full overflow-hidden">
      <div
        v-for="(image, i) in images"
        :key="i"
        :class="'carousel-item float-left w-full' + (i == 0 ? ' active' : '')"
      >
        <img :src="image.src" class="block w-full" :alt="image.alt" />
      </div>
    </div>
    <div v-if="setButtons">
      <button
        class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target="#carouselIndicators"
        data-bs-slide="prev"
      >
        <span
          class="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden">Previous</span>
      </button>
    </div>
    <div v-if="setButtons">
      <button
        class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target="#carouselIndicators"
        data-bs-slide="next"
      >
        <span
          class="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
/*
{
    src: "imageURL",
    alt: "IMAGE ALT TEXT"
}
*/
import "tw-elements";
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    setButtons() {
      return this.images.length > 1;
    },
  },
};
</script>

<style scoped></style>
