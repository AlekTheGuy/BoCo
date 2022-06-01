<template>
  <div class="h-screen grid md:mt-8">
    <AddNewItem />
  </div>
</template>

<script>
import AddNewItem from "@/components/ItemComponents/NewItemForm";

export default {
  name: "AddNewItemView.vue",
  components: {
    AddNewItem,
  },
};
</script>
