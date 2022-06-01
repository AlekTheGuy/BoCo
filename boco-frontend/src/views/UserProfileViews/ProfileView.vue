<template>
  <!-- A view for the user profile card -->
  <div>
    <LargeProfileCard :isCurrentUser="true" class="md:mt-8" />
  </div>
</template>

<script>
import LargeProfileCard from "@/components/UserProfileComponents/UserProfile.vue";

export default {
  components: {
    LargeProfileCard,
  },
};
</script>
