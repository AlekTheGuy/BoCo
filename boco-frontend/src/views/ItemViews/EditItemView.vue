<template>
  <!-- A view for editing the item -->
  <div class="h-screen grid md:mt-8">
    <edit-item-form />
  </div>
</template>

<script>
import EditItemForm from "@/components/ItemComponents/EditItemForm.vue";

export default {
  name: "EditItemView",
  components: {
    EditItemForm,
  },
};
</script>
