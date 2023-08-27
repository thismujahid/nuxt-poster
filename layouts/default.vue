<template>
  <div class="d-flex flex-column justify-content-between layout-cp">
    <div>
      <TheHeader />
      <Nuxt />
    </div>
    <footer class="p-4 bg-dark text-center text-white">
      All rights reserved to
      <a class="text-primary" href="https://thismujahid.com" target="_blank"
        >Muhammed mujahid</a
      >
    </footer>
  </div>
</template>
<script>
import NuxtLogo from "~/components/NuxtLogo.vue";
import TheHeader from "~/components/TheHeader.vue";
import { mapActions } from "vuex";

export default {
  components: { NuxtLogo, TheHeader },
  watch: {
    $route(nr) {
      this.checkUserState();
    },
  },
  created() {
    this.checkUserState();
  },
  methods: {
    ...mapActions("Auth", ["checkUserState"]),
  },
};
</script>
<style>
ul {
  list-style: none;
}
.layout-cp {
  min-height: 100vh;
}
</style>
