<template>
  <div>
    <PageHeader
      :title="`Wellcome back${user && user.name ? ', ' + user.name : ''} 👋`"
      :cover="require('assets/images/admin.jpg')"
    />
    <b-container class="my-3">
      <b-row>
        <b-col class="admin-wrapper" cols="4">
          <b-list-group class="sidebar-fixed">
            <b-list-group-item to="/admin/profile"
              >My profile
            </b-list-group-item>
            <b-list-group-item to="/admin/posts"> My posts </b-list-group-item>
            <b-list-group-item to="/auth" @click.prevent="cnfrim = true">
              <b-button
                @click.stop="
                  loader = true;
                  logout()
                    .then((res) => {
                      $router.push('/auth');
                    })
                    .catch((err) => {
                      loader = false;
                    });
                "
                variant="danger"
                v-if="cnfrim"
              >
                <b-spinner small class="mx-1" v-if="loader" />
                {{ loader ? "Loging out.." : "Sure to logout?" }}
              </b-button>
              <b-button
                v-if="cnfrim"
                variant="success"
                @click.stop="cnfrim = false"
              >
                {{ "No" }}
              </b-button>
              <span v-else> Logout </span>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col cols="8">
          <nuxt-child />
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
      loader: false,
      cnfrim: false,
    };
  },
  methods: {
    ...mapActions("Auth", ["logout"]),
  },
  computed: {
    ...mapGetters("Auth", ["user"]),
  },
  middleware: "auth",
};
</script>
