<template>
  <div class="h-screen grid md:mt-8">
    <NewPasswordForm></NewPasswordForm>
  </div>
</template>

<script>
import NewPasswordForm from "@/components/UserAuthComponents/NewPasswordForm";
export default {
  name: "NewPasswordView.vue",
  components: {
    NewPasswordForm,
  },
};
</script>
