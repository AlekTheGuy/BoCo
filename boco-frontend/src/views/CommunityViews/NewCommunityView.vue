<template>
  <div class="h-screen grid md:mt-8">
    <NewCommunity />
  </div>
</template>

<script>
import NewCommunity from "@/components/CommunityComponents/NewCommunityForm";
export default {
  name: "CreateNewGroupView.vue",
  components: {
    NewCommunity,
  },
};
</script>

<style scoped></style>
