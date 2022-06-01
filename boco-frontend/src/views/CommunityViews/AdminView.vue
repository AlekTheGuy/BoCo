<template>
  <CommunityHeader :admin="true" class="mb-5" />
  <div
    class="flex border-b border-gray-200 dark:border-gray-700 overflow-y-hidden"
  >
    <button
      v-for="(tab, index) in tabs"
      :key="tab"
      @click="changeTab(index)"
      class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
      :class="[currentTab === index ? activeClasses : inactiveClasses]"
    >
      {{ tab }}
    </button>
  </div>
  <MemberList
    :requests="false"
    :buttons="['chat', 'kick']"
    v-if="currentTab === 0"
  />
  <MemberList
    :requests="true"
    :buttons="['accept', 'reject']"
    v-if="currentTab === 1"
  />
  <CommunitySettings v-if="currentTab === 2" />
</template>

<script>
import MemberList from "@/components/CommunityComponents/MemberList.vue";
import CommunitySettings from "@/components/CommunityComponents/CommunitySettings.vue";
import CommunityHeader from "@/components/CommunityComponents/CommunityHeader.vue";

export default {
  name: "CommunityAdminView",
  components: {
    CommunityHeader,
    MemberList,
    CommunitySettings,
  },
  data() {
    return {
      tabs: ["Medlemsliste", "Medlemsforespørsler", "Felleskap-innstillinger"],
      currentTab: 0, //Currently selected tab (default 0 "Medlemsliste")
    };
  },
  methods: {
    changeTab(index) {
      this.currentTab = index;
    },
  },
  computed: {
    activeClasses() {
      return "text-primary-medium border-primary-medium dark:border-primary-light dark:text-primary-light";
    },
    inactiveClasses() {
      return "text-gray-700 border-transparent dark:text-white cursor-base hover:border-gray-400";
    },
  },
};
</script>
