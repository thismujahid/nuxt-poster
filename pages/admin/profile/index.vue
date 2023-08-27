<template>
  <div class="profile-page" v-if="user">
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-end">
        <b-avatar
          :text="user.name ? user.name.charAt(0) : ''"
          :src="user.image_url"
          variant="primary"
          size="5rem"
        />
        <h6 class="mx-1">
          {{ user.name }}
          <br />
          <small> {{ user.email }} </small>
        </h6>
      </div>
      <b-button variant="primary" @click="$router.push('/admin/profile/edit')"
        >Edit profile</b-button
      >
    </div>

    <hr />
    Nothing to do at this time
  </div>
  <div v-else class="d-flex py-5 justify-content-center align-items-center">
    <b-spinner small class="mx-1" /> Loading profile...
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("Auth", ["user"]),
  },
  middleware:'auth'

};
</script>
