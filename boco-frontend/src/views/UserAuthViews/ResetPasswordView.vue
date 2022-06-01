<template>
  <div class="h-screen grid md:mt-8">
    <ResetPassword></ResetPassword>
  </div>
</template>

<script>
import ResetPassword from "@/components/UserAuthComponents/ResetPasswordForm";
export default {
  name: "ResetPasswordView.vue",
  components: {
    ResetPassword,
  },
};
</script>
