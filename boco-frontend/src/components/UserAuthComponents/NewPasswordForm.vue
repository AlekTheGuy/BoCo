<template>
  <!-- A form for changing password -->
  <div
    class="md:ring-1 ring-gray-300 rounded-xl overflow-hidden mx-auto mb-auto max-w-md w-full p-4"
  >
    <!-- Header -->
    <h3
      class="text-xl font-medium text-center text-gray-600 dark:text-gray-200 mt-4 mb-8"
    >
      Endre passord
    </h3>

    <!-- Input field for old password -->
    <div
      id="oldPasswordField"
      :class="{ error: v$.user.oldPassword.$errors.length }"
    >
      <label class="block text-sm text-gray-800 dark:text-gray-200"
        >Gammelt passord</label
      >
      <input
        type="password"
        v-model="v$.user.oldPassword.$model"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <!-- error message for password -->
      <div v-for="(error, index) of v$.user.oldPassword.$errors" :key="index">
        <div
          class="text-error-medium text-sm"
          v-show="showError"
          id="oldPasswordErrorId"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- New password -->
    <div
      id="firstPasswordField"
      class="mt-4"
      :class="{ error: v$.user.password.$errors.length }"
    >
      <label class="block text-sm text-gray-800 dark:text-gray-200"
        >Nytt passord</label
      >
      <input
        type="password"
        v-model="v$.user.password.$model"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <!-- error message for password -->
      <div v-for="(error, index) of v$.user.password.$errors" :key="index">
        <div
          class="text-error-medium text-sm"
          v-show="showError"
          id="passwordErrorId"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Repeating new password -->
    <div
      id="secondPasswordField"
      class="mt-4"
      :class="{ error: v$.user.rePassword.$errors.length }"
    >
      <div class="flex items-center justify-between">
        <label class="block text-sm text-gray-800 dark:text-gray-200"
          >Gjenta nytt passord</label
        >
      </div>

      <input
        type="password"
        v-model="v$.user.rePassword.$model"
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <!-- error message for password -->
      <div v-for="(error, index) of v$.user.rePassword.$errors" :key="index">
        <div
          class="text-error-medium text-sm"
          v-show="showError"
          id="rePasswordErrorId"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>

    <!-- Button -->
    <div id="buttonsField" class="mt-6">
      <Button
        class="float-right"
        @click="setNewPassword"
        :text="'Sett ny passord'"
      />
    </div>

    <!-- Message for user -->
    <div class="flex items-center justify-center text-center bg-gray-50">
      <label
        class="mx-2 text-sm font-bold text-error-medium dark:text-primary-light hover:underline"
        >{{ message }}</label
      >
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";
import { doNewPassword } from "@/utils/apiutil";
import { mapState } from "vuex";
import Button from "@/components/BaseComponents/ColoredButton";

export default {
  name: "NewPasswordForm.vue",

  components: {
    Button,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      user: {
        oldPassword: {
          required: helpers.withMessage(`Feltet må være utfylt`, required),
        },
        password: {
          required: helpers.withMessage(`Feltet må være utfylt`, required),
          minLength: helpers.withMessage(
            "Passordet må være minst 8 karakterer lang",
            minLength(8)
          ),
        },
        rePassword: {
          sameAs: helpers.withMessage(
            "Passordene må være like",
            sameAs(this.user.password)
          ),
          required: helpers.withMessage(`Feltet må være utfylt`, required),
        },
      },
    };
  },
  data() {
    return {
      message: "",
      user: {
        oldPassword: "",
        password: "",
        rePassword: "",
      },

      showError: false,
    };
  },
  computed: mapState({
    token: (state) => state.user.token,
  }),
  methods: {
    /**
     * Validates the form. If it goes through, sends a password change
     * request to api and gives user a message if it does not get changed.
     * If changed, saves new token to state.
     */
    async setNewPassword() {
      this.showError = true;

      this.v$.user.$touch();

      if (this.v$.user.$invalid) {
        return;
      }

      const newPassword = {
        newPassword: this.user.password,
        oldPassword: this.user.oldPassword,
      };

      const newPasswordResponse = await doNewPassword(newPassword);

      if (newPasswordResponse.correctPassword) {
        //New password was set
        this.message = "";
        this.$store.commit("saveToken", newPasswordResponse.token);
        await this.$router.push("/");
      } else if (!newPasswordResponse.correctPassword) {
        //The old password was not correct
        this.message = "Det gamle passordet stemmer ikke for denne brukeren";
      } else {
        //Ops something went wrong
        this.message = "Ops noe gikk galt";
      }
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>
