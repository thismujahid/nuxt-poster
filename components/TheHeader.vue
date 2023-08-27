<template>
  <header
    class="p-4 bg-primary d-flex align-items-center justify-content-between"
  >
    <div
      @click="$router.push('/')"
      class="d-flex align-items-center pointer text-dark"
    >
      <NuxtLogo />
      <h4 class="text-nowrap m-0">Nuxt Poster</h4>
    </div>
    <ul class="p-0 d-flex m-0 align-items-center justify-content-center">
      <li class="mx-1 mb-0"><nuxt-link exact to="/">Home</nuxt-link></li>
      <li class="mx-1 mb-0">
        <nuxt-link exact to="/posts">All posts</nuxt-link>
      </li>
      <li class="mx-1 mb-0">
        <nuxt-link exact to="/about">About us</nuxt-link>
      </li>
    </ul>
    <div class="action">
      <div
        v-if="user"
        class="d-flex align-items-center pointer"
        @click="$router.push('/admin/profile')"
      >
        <span style="line-height: 13px" class="mx-1">
          {{ user.name || "No name" }} <br />
        </span>
        <b-avatar
          :src="user.image_url"
          :text="user.name ? user.name.charAt(0) : ''"
          variant="primary"
        />
      </div>
      <b-button
        v-if="!user"
        :disabled="$route.name === 'auth' && !user"
        variant="dark"
        @click="$router.push('/auth')"
      >
        Login
      </b-button>
    </div>
  </header>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("Auth", ["user"]),
  },
};
</script>
