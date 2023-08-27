<template>
  <div class="text-center py-5" v-if="user && !user.is_verified">
    <h3>Your E-mail address not verfied yet</h3>
    We have sent an E-mail address to verify it, please check your box to
    confirm yuor email.<br />
    Does't recevd the email?<br />
    <b-button
      variant="primary"
      @click="
        loader = true;
        $forceUpdate();
        verifyUserEmail()
          .then((res) => {
            loader = false;
          })
          .catch((err) => {
            loader = false;
          });
      "
    >
      <b-spinner small class="mx-1" v-if="loader" />
      {{ loader ? "Resending verfiy email..." : "Resend verify email" }}
    </b-button>
  </div>
  <div class="text-center py-5" v-else-if="user && user.is_verified">
    <h3>Your E-mail address verfied</h3>
    No Verfing required, you are already verfied
    <b-button variant="primary" to="/admin/profile">
      {{ "Go to profile" }}
    </b-button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loader: false,
    };
  },
  methods: {
    ...mapActions("Auth", ["verifyUserEmail"]),
  },
  computed: {
    ...mapGetters("Auth", ["user"]),
  },
};
</script>
