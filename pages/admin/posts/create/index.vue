<template>
  <div>
    <b-overlay :show="loader">
      <template #overlay>
        <b-spinner small class="mx-1" /> Saving post data...
      </template>
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="m-0">Create new post</h4>
        <b-button @click="$router.push('/admin/posts')" variant="outline-dark">
          Back
        </b-button>
      </div>
      <hr />
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Title">
          <b-form-input
            v-model="newPost.title"
            required
            placeholder="Enter title"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Preview text">
          <b-form-input
            required
            v-model="newPost.prev"
            placeholder="Will apper on post card"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Post image link">
          <b-form-input
            required
            v-model="newPost.image"
            placeholder="Will apper on post card"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Content">
          <b-form-textarea
            required
            v-model="newPost.content"
            placeholder="Enter content"
          >
          </b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary"> Create </b-button>
        <b-button @click="$router.push('/admin/posts')" variant="outline-dark">
          Discard
        </b-button>
      </b-form>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      newPost: {},
      loader: false,
    };
  },
  middleware: "auth",
  methods: {
    ...mapActions("Posts", ["savePost"]),
    onSubmit() {
      this.loader = true;
      this.savePost({
        ...this.newPost,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: "Muhammad Mujahid",
      })
        .then((res) => {
          this.loader = false;
          this.$router.push("/admin/posts");
        })
        .catch((err) => {
          this.loader = false;
          console.log(err);
        });
    },
  },
};
</script>
