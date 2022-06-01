<template>
  <!-- Image -->
  <img
    :src="image"
    class="w-2/5 inline"
    alt="Bilde av gjenstanden"
    @click="toggleModal"
  />
  <!-- Modal -->
  <CustomFooterModal
    @close="toggleModal"
    :message="'Bilder som fjernes kan ikke lastes opp på nytt uten å laste opp et annet bilde først.'"
    :title="'Er du sikker på at du vil fjene bilde?'"
    :visible="show"
  >
    <!-- Buttons for modal footer -->
    <div class="flex justify-center p-2">
      <ColoredButton :text="'Avbryt'" @click="toggleModal" class="m-2" />
      <ColoredButton
        :text="'Slett'"
        :color="'red'"
        @click="removeImage"
        class="m-2"
      />
    </div>
  </CustomFooterModal>
</template>

<script>
import ColoredButton from "@/components/BaseComponents/ColoredButton";
import CustomFooterModal from "@/components/BaseComponents/CustomFooterModal.vue";

/**
 * Displays uploaded image for forms.
 */
export default {
  components: {
    ColoredButton,
    CustomFooterModal,
  },
  data() {
    return {
      show: false,
    };
  },
  props: {
    image: String,
  },
  methods: {
    /**
     * Emits remove image to parent
     */
    removeImage() {
      this.$emit("remove");
    },
    /**
     * Toggles modal
     */
    toggleModal() {
      this.show = !this.show;
    },
  },
};
</script>
