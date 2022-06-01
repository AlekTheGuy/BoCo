<template>
  <div class="h-screen grid md:mt-8">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from "@/components/UserAuthComponents/LoginForm";
export default {
  name: "LoginView.vue",
  components: {
    LoginForm,
  },
};
</script>
