<template>
  <div
    class="md:ring-1 ring-gray-300 rounded-xl overflow-hidden mx-auto mb-auto max-w-md w-full p-4"
  >
    <h3 class="text-xl font-medium text-center text-primary-light mt-4 mb-8">
      Glemt passordet ditt?
    </h3>

    <div
      id="emailField"
      class="m-6"
      :class="{ error: v$.email.$errors.length }"
    >
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >E-post</label
        >
        <input
          type="email"
          id="email"
          class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="eksempel@eksempel.no"
          v-model="v$.email.$model"
          required
          @keyup.enter="sendHome"
        />
        <!-- error message -->
        <div v-for="(error, index) of v$.email.$errors" :key="index">
          <div
            class="text-error-medium text-sm"
            v-show="showError"
            id="emailErrorId"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
      <Button
        class="float-right"
        @click="sendHome"
        :text="'Tilbakestill passord'"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import Button from "@/components/BaseComponents/ColoredButton";

export default {
  name: "ResetPassword.vue",

  components: {
    Button,
  },
  data() {
    return {
      showError: false,
      email: "",
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage("Feltet må være utfylt", required),
        email: helpers.withMessage(`E-posten er ugyldig`, email),
      },
    };
  },
  methods: {
    sendHome() {
      this.showError = true;

      this.v$.email.$touch();

      if (this.v$.email.$invalid) {
        return;
      } else {
        this.$router.push("/");
      }
    },
  },
  validate() {
    this.$refs.form.validate();
  },
};
</script>
