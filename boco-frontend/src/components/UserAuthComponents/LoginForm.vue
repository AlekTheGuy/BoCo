<template>
  <!-- Login form -->
  <div
    class="md:ring-1 ring-gray-300 rounded-xl overflow-hidden mx-auto mb-auto max-w-md w-full"
  >
    <!-- Header -->
    <div class="px-6 py-4 mt-4">
      <div
        class="text-xl md:text-2xl font-medium text-center text-primary-light mt-4 mb-8"
      >
        Logg på
      </div>

      <!-- Email -->
      <div>
        <div
          class="w-full mt-6"
          :class="{ error: v$.user.email.$errors.length }"
        >
          <input
            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
            type="email"
            placeholder="Skriv inn din e-postadresse *"
            v-model="v$.user.email.$model"
            required
          />
          <!-- error message for email -->
          <div v-for="(error, index) of v$.user.email.$errors" :key="index">
            <div
              class="text-error-medium text-sm"
              v-show="showError"
              id="emailErrorId"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>

        <!-- Password -->
        <div
          class="w-full mt-6"
          :class="{ error: v$.user.password.$errors.length }"
        >
          <input
            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
            type="password"
            placeholder="Vennligst oppgi passordet ditt *"
            v-model="v$.user.password.$model"
            @keyup.enter="loginClicked"
            required
          />
          <!-- error message for password -->
          <div
            class="text-error-medium text-sm"
            v-for="(error, index) of v$.user.password.$errors"
            :key="index"
          >
            <div
              class="text-error-medium text-sm"
              v-show="showError"
              id="passwordErrorId"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>

        <!-- Router link for forgetting password. Redirects to reset password page. -->
        <div class="flex items-center justify-between mt-8">
          <router-link to="/resetPassword" class="text-primary-medium"
            >Glemt passord?</router-link
          >

          <!-- Button for logging in -->
          <Button
            class="login"
            @click="loginClicked"
            :text="'Logg på'"
          ></Button>
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700"
    >
      <!-- Router link to redirect to registering a new user page -->
      <router-link
        to="/register"
        class="mx-2 text-sm font-bold text-primary-medium dark:text-primary-light hover:underline"
        >Opprette ny konto</router-link
      >
    </div>
    <div class="flex items-center justify-center text-center bg-gray-50">
      <!-- Shows a message to user if login fails -->
      <label
        class="mx-2 text-sm font-bold text-error-medium dark:text-primary-light hover:underline"
        >{{ message }}</label
      >
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { doLogin } from "@/utils/apiutil";
import Button from "@/components/BaseComponents/ColoredButton";
import UserService from "@/services/user.service";

export default {
  name: "LoginForm.vue",

  components: {
    Button,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      user: {
        email: {
          required: helpers.withMessage(`Feltet må være utfylt`, required),
          email: helpers.withMessage(`E-posten er ugyldig`, email),
        },
        password: {
          required: helpers.withMessage(`Feltet må være utfylt`, required),
        },
      },
    };
  },
  data() {
    return {
      message: "",
      user: {
        email: "",
        password: "",
      },

      showError: false,
    };
  },

  methods: {
    /**
     * When login clicked, the inputs gets validated. If validation goes
     * through loginRequest gets posted to api. If it returns false,
     * user gets a message saying the email or password is wrong. If it
     * returns true, the token returned gets saved to the state.
     */
    async loginClicked() {
      this.showError = true;

      this.v$.user.$touch();

      if (this.v$.user.$invalid) {
        return;
      }

      const loginRequest = {
        email: this.user.email,
        password: this.user.password,
      };

      const loginResponse = await doLogin(loginRequest);

      if (loginResponse.isLoggedIn === false) {
        this.message = "Feil e-post/passord";
      } else if (loginResponse.isLoggedIn === true) {
        this.$store.commit("saveToken", loginResponse.token);
        const adminList = await UserService.getAdminList();
        this.$store.commit("addAdminList", adminList);
        await this.$router.push("/");
      }
    },
  },
};
</script>
