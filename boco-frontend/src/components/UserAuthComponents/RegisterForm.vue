<template>
  <!-- Register form for creating a new user account -->
  <div
    class="w-full max-w-md mx-auto mb-auto md:ring-1 ring-gray-300 overflow-hidden rounded-xl p-4"
  >
    <div
      class="text-xl md:text-2xl font-medium text-center text-primary-light mt-4 mb-8"
      id="registerLabel"
    >
      Opprett ny konto
    </div>

    <form @submit.prevent>
      <div class="grid grid-cols-1 gap-6 mt-4">
        <div>
          <!-- Email -->
          <input
            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
            v-model="email"
            id="email"
            type="email"
            placeholder="E-post adresse"
          />
          <!-- error message for email -->
          <div
            class="text-error-medium text-sm"
            v-for="(error, index) of v$.email.$errors"
            :key="index"
          >
            <div class="text-error-medium text-sm" v-show="showError">
              {{ error.$message }}
            </div>
          </div>
          <div class="text-error-medium text-sm" v-show="errorMessage">
            {{ errorMessage }}
          </div>
        </div>

        <div>
          <!-- Password -->
          <input
            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
            v-model="password"
            id="password"
            type="password"
            placeholder="Passord"
          />
          <!-- error message -->
          <div
            class="text-error-medium text-sm"
            v-for="(error, index) of v$.password.$errors"
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

        <div>
          <input
            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
            v-model="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Bekreft passord"
          />
          <!-- error message -->
          <div
            class="text-error-medium text-sm"
            v-for="(error, index) of v$.confirmPassword.$errors"
            :key="index"
          >
            <div
              class="text-error-medium text-sm"
              v-show="showError"
              id="confirmPasswordErrorId"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div>
          <!-- First name -->
          <input
            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
            data-test="firstNameTest"
            v-model="firstName"
            id="firstName"
            type="text"
            placeholder="Fornavn"
          />
          <!-- error message for first name-->
          <div
            class="text-error-medium text-sm"
            v-for="(error, index) of v$.firstName.$errors"
            :key="index"
          >
            <div
              class="text-error-medium text-sm"
              v-show="showError"
              id="firstNameErrorId"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div>
          <!-- Last name -->
          <input
            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
            v-model="lastName"
            id="lastName"
            type="text"
            placeholder="Etternavn"
          />
          <!-- error message for last name -->
          <div
            class="text-error-medium text-sm"
            v-for="(error, index) of v$.lastName.$errors"
            :key="index"
          >
            <div
              class="text-error-medium text-sm"
              v-show="showError"
              id="lastNameErrorId"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div>
          <!-- Address -->
          <input
            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-primary-light dark:focus:border-primary-light focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary-light"
            v-model="address"
            id="address"
            type="text"
            placeholder="Adresse"
          />
          <!-- error message for address -->
          <div
            class="text-error-medium text-sm"
            v-for="(error, index) of v$.address.$errors"
            :key="index"
          >
            <div
              class="text-error-medium text-sm"
              v-show="showError"
              id="addressErrorId"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <Button @click="submit" :text="'Opprett'"></Button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { doLogin } from "@/utils/apiutil";
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import Button from "@/components/BaseComponents/ColoredButton";
import UserService from "@/services/user.service";

export default {
  components: {
    Button,
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      showError: false,
      errorMessage: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage(`Feltet må være utfylt`, required),
        email: helpers.withMessage("E-posten er ugyldig", email),
      },
      password: {
        required: helpers.withMessage(`Feltet må være utfylt`, required),
        minLength: helpers.withMessage(
          "Passordet må være minst 8 karakterer lang",
          minLength(8)
        ),
      },
      confirmPassword: {
        sameAs: helpers.withMessage(
          "Passordene må være like",
          sameAs(this.password)
        ),
        required: helpers.withMessage(`Feltet må være utfylt`, required),
      },
      firstName: {
        required: helpers.withMessage(`Feltet må være utfylt`, required),
      },
      lastName: {
        required: helpers.withMessage(`Feltet må være utfylt`, required),
      },
      address: {
        required: helpers.withMessage(`Feltet må være utfylt`, required),
      },
    };
  },
  methods: {
    async submit() {
      //Display loading symbol
      this.showError = true;

      //Validate form
      const result = await this.v$.$validate();
      if (!result) {
        this.loading = false;
        return;
      }

      //Send a request to create a user and save success as a bool
      const userCreated = await this.sendRegisterRequest();

      //If a user is created succsessfully, try to login
      //If we get this far, we will be pushed anyway so there is no point updating "loading"
      if (!userCreated) return;

      const loginRequest = {
        email: this.email,
        password: this.password,
      };

      const loginResponse = await doLogin(loginRequest);

      if (loginResponse.isLoggedIn === false) {
        this.errorMessage = "Failed to log in with new user";
        this.$store.commit("logout");
        await this.$router.push("/login");
        return;
      }
      this.$store.commit("saveToken", loginResponse.token);
      const adminList = await UserService.getAdminList();
      this.$store.commit("addAdminList", adminList);
      await this.$router.push("/");
    },
    async sendRegisterRequest() {
      const userInfo = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        address: this.address,
      };
      const res = await UserService.registerUser(userInfo);
      this.errorMessage = res;
      return res.status === 200;
    },
  },
};
</script>
