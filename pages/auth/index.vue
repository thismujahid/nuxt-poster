<template>
  <div class="auth-page">
    <PageHeader
      title="Wellcome, there 👋"
      :cover="require('assets/images/admin.jpg')"
    />
    <b-container class="my-4">
      <b-row>
        <b-col cols="7">
          <h4 class="text-primary">We are amazing blog</h4>
          <p>
            we are providing a lot of news<br />
            about lastest technology, follow us to get updated.
          </p>
        </b-col>
        <b-col cols="5">
          <b-form @submit.prevent="startAuth">
            <b-form-group label="E-mail">
              <b-form-input
                required
                type="email"
                v-model="formData.email"
                placeholder="Enter user name"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="Password">
              <b-form-input
                required
                v-model="formData.password"
                placeholder="Enter password"
                type="password"
              >
              </b-form-input>
            </b-form-group>
            <div class="mb-1" v-if="step == 1">
              Need an account?
              <span @click="step = 2" class="text-primary pointer"
                >Click here</span
              >
            </div>
            <div class="mb-1" v-if="step == 2">
              Already have an account?
              <span @click="step = 1" class="text-primary pointer"
                >Click here</span
              >
            </div>
            <b-alert v-if="error" :show="isError" variant="danger">
              {{
                error
                  .replace("Firebase: Error ", "")
                  .replace("(", "")
                  .replace(")", "")
                  .split("/")[1]
              }}
            </b-alert>
            <b-button type="submit" variant="primary">
              <span v-if="!loader">
                {{ step == 1 ? "Login" : "Signup" }}
              </span>
              <span v-else>
                <b-spinner small class="mx-1" />
                {{ loadMsg }}
              </span>
            </b-button>
            <b-button type="reset" variant="outline-dark"> Reset </b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      step: 1,
      formData: {},
      loader: false,
      loadMsg: null,
      error: null,
      isError: false,
    };
  },
  computed: {
    ...mapGetters("Auth", ["user"]),
  },
  methods: {
    ...mapActions("Auth", ["login", "signup"]),
    startAuth() {
      this.loader = true;
      this.isError = false;
      this.loadMsg =
        this.step == 1 ? "Loging in..." : "Creating your account...";
      this[this.step == 1 ? "login" : "signup"](this.formData)
        .then((res) => {
          if (this.user && !this.user.is_verified) {
            this.$router.push("/auth/verify/email");
          } else if (this.user) {
            this.$router.push("/admin/profile");
          }
        })
        .catch((err) => {
          this.loader = false;
          this.isError = true;
          this.error = err;
          this.$forceUpdate();
        });
    },
  },

};
</script>
