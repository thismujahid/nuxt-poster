<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="m-0">Edit your profile</h4>
      <b-button @click="$router.push('/admin/profile')" variant="outline-dark">
        Back
      </b-button>
    </div>
    <hr />
    <b-overlay :show="loader">
      <template #overlay>
        <b-spinner small class="mx-1" /> Updating your profile data...
      </template>
      <b-form @submit.prevent="startUpdate">
        <b-form-group label="Your name">
          <b-form-input v-model="formData.name" placeholder="Enter full name">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Your email">
          <b-form-input
            v-model="formData.email"
            placeholder="Enter E-mail"
            type="email"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Photo url">
          <b-form-input
            v-model="formData.image_url"
            placeholder="Enter photo url"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="New password">
          <b-form-input
            v-model="formData.new_password"
            placeholder="Enter new password"
            type="password"
          >
          </b-form-input>
        </b-form-group>
        <b-alert variant="danger" :show="isError">
          {{ error }}
        </b-alert>
        <b-button type="submit" variant="primary"> Update </b-button>
        <b-button
          @click="$router.push('/admin/profile')"
          variant="outline-dark"
        >
          Discard
        </b-button>
      </b-form>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {},
      error: null,
      isError: false,
      loader: false,
    };
  },
  watch: {
    user(nuser) {
      if (nuser)
        this.formData = {
          ...nuser,
        };
      this.isError = false;
    },
  },
  mounted() {
    this.formData = {
      ...this.user,
    };
  },
  middleware:'auth',
  methods: {
    ...mapActions("Auth", ["update"]),
    startUpdate() {
      this.loader = true;
      this.isError = false;
      this.update(this.formData)
        .then((res) => {
          this.loader = false;
          if (this.user.is_verified) {
            this.$router.push("/admin/profile");
          }
        })
        .catch((err) => {
          this.loader = false;
          this.isError = true;
          this.error = err;
        });
    },
  },
  computed: {
    ...mapGetters("Auth", ["user"]),
  },
};
</script>
