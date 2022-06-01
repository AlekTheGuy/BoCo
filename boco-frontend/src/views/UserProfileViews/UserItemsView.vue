<template>
  <!-- A view for showing all the items the user has posted/added -->
  <user-items> </user-items>
</template>

<script>
import UserItems from "@/components/UserProfileComponents/UserItems.vue";
export default {
  name: "UserItemsView",
  components: {
    UserItems,
  },
};
</script>
