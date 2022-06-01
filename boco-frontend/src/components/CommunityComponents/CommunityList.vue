<template>
  <!-- A list conatining all the communities -->
  <p
    v-if="!communities.length"
    class="flex place-content-center text-gray-400 mt-8"
  >
    Ingen grupper
  </p>
  <ul v-else>
    <li v-for="community in communities" :key="community">
      <CommunityListItem
        :community="community"
        :member="member"
        class="border-black"
      />
    </li>
  </ul>
</template>

<script>
import CommunityListItem from "@/components/CommunityComponents/CommunityListItem.vue";

export default {
  name: "CommunityList",
  props: {
    communities: Array,
    member: Boolean,
  },
  components: {
    CommunityListItem,
  },
};
</script>
