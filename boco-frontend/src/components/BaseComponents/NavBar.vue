<template>
  <!-- NavBar -->
  <nav
    class="flex items-center bg-white justify-between h-10 md:h-14 border-1 border-b border-gray-300 border-solid sticky top-0 z-50"
  >
    <!-- Logo reroutes to homepage -->
    <div class="logo">
      <img
        class="m-1 ml-4 cursor-pointer h-9 md:h-12"
        src="../../assets/logo3.svg"
        alt="BoCo logo"
        @click="$router.push('/')"
      />
    </div>
    <ul class="flex justify-between">
      <!-- New listing button -->
      <li
        class="cursor-pointer"
        v-if="this.$store.state.user.token !== null"
        @click="$router.push('/newItem')"
      >
        <PlusIcon
          class="m-6 md:mr-2 h-7 text-primary-medium float-left"
          alt="Legg til"
        />
        <a class="hidden md:block mt-7 text-sm float-right">Legg til</a>
      </li>

      <!-- My messages button -->
      <li
        class="cursor-pointer"
        v-if="this.$store.state.user.token !== null"
        @click="loadMessages"
      >
        <div class="notification-container relative">
          <ChatAlt2Icon
            class="m-6 md:mr-2 h-7 text-primary-medium float-left"
            alt="Meldinger"
          />
          <p
            class="notification absolute bg-secondary top-0 p-1 min-w-[20px] min-h-[20px] rounded-full text-xs text-white font-bold text-center right-0 cursor-pointer"
            v-if="newMessages > 0"
          >
            {{ notifications }}
          </p>
          <a class="hidden md:block mt-7 text-sm float-right">Meldinger</a>
        </div>
      </li>

      <!-- User profile button -->
      <li class="cursor-pointer" @click="loadProfile">
        <UserCircleIcon
          class="m-6 md:mr-2 h-7 text-primary-medium float-left"
          alt="Profil"
        />
        <!-- Shows "Profil" if user is logged in, else "Logg inn"  -->
        <a
          v-if="this.$store.state.user.token !== null"
          class="hidden md:block mr-4 mt-7 text-sm float-right"
          >Profil</a
        >
        <a v-else class="hidden md:block mr-4 mt-7 text-sm float-right"
          >Logg inn</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { parseUserFromToken } from "@/utils/token-utils";
import { PlusIcon, ChatAlt2Icon, UserCircleIcon } from "@heroicons/vue/outline";
import ws from "@/services/ws";

/**
 * NavBar component used in App
 */
export default {
  name: "NavBar",
  components: {
    PlusIcon,
    ChatAlt2Icon,
    UserCircleIcon,
  },
  data() {
    return {
      newMessages: 0,
    };
  },
  computed: {
    /**
     * Format method for notification number on messages.
     * Shows "+99" the user has more than 99 new messages.
     */
    notifications() {
      if (this.newMessages > 99) {
        return "+99";
      } else {
        return this.newMessages;
      }
    },
  },
  methods: {
    /**
     * Method for routing to user profile. Routes to user profile if logged in, otherwise to login.
     */
    async loadProfile() {
      if (this.$store.state.user.token !== null) {
        let user = parseUserFromToken(this.$store.state.user.token);
        let id = user.accountId;
        await this.$router.push("/profile/" + id);
      } else {
        await this.$router.push("/login");
      }
    },
    /**
     * Method for routing to messages.
     */
    loadMessages() {
      this.newMessages = 0;
      this.$router.push("/messages");
    },
  },
  /**
   * On creation of this component the websocket service checks if the user has new messages. To display by the chat button.
   */
  created() {
    ws.on(
      "NEW_MESSAGE",
      () => {
        if (this.$router.currentRoute.value.name == "messages") return;
        this.newMessages += 1;
      },
      "header"
    );
  },
};
</script>

<style scoped>
.notification {
  transform: translate(-290%, 50%);
}

@media (max-width: 768px) {
  .notification {
    transform: translate(-60%, 70%);
  }
}
</style>
