<template>
  <CommunityHeader :admin="false" class="mb-5 mt-5" />
  <MemberList :buttons="['chat']" />
</template>

<script>
import CommunityHeader from "@/components/CommunityComponents/CommunityHeader";
import MemberList from "@/components/CommunityComponents/MemberList.vue";

export default {
  components: {
    CommunityHeader,
    MemberList,
  },
};
</script>
