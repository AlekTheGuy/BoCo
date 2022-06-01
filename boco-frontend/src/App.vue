<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import NavBar from "./components/BaseComponents/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
});
</script>

<style global>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
