<template>
  <chats-component></chats-component>
</template>

<script>
import ChatsComponent from "@/components/ChatComponents/ChatsComponent.vue";
export default {
  components: {
    ChatsComponent,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggleModal() {
      this.show = !this.show;
    },
  },
};
</script>
