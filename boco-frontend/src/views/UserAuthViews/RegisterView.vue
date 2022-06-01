<template>
  <div class="h-screen grid md:mt-8">
    <RegisterFormComponent />
  </div>
</template>

<script>
import RegisterFormComponent from "../../components/UserAuthComponents/RegisterForm.vue";

export default {
  components: {
    RegisterFormComponent,
  },
};
</script>
