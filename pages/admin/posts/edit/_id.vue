<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <h5 class="m-0">Edit post</h5>
      <b-button to="/admin/posts" variant="primary"> Back </b-button>
    </div>
    <hr />
    <b-overlay :show="loader">
      <template #overlay>
        <b-spinner small class="mx-1" /> Updating post data...
      </template>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Title">
          <b-form-input
            v-model="editedPost.title"
            required
            placeholder="Enter title"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Preview text">
          <b-form-input
            required
            v-model="editedPost.prev"
            placeholder="Will apper on post card"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Post image link">
          <b-form-input
            required
            v-model="editedPost.image"
            placeholder="Will apper on post card"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Content">
          <b-form-textarea
            required
            v-model="editedPost.content"
            placeholder="Enter content"
          >
          </b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary"> Update </b-button>
        <b-button @click="$router.push('/admin/posts')" variant="outline-dark">
          Discard
        </b-button>
      </b-form>
    </b-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  asyncData(context) {
    return context.store.dispatch("Posts/loadPostDetails", context.params.id);
  },
  computed: {
    ...mapGetters("Posts", ["post"]),
  },
  data() {
    return {
      editedPost: this.post ? { ...this.post } : {},
      loader: false,
    };
  },
  watch:{
    post(np){
      if(np){
        this.editedPost = {...np}
      }
    }
  },
  mounted(){
    if(this.post){
      this.editedPost = {...this.post}
    }
  },
  methods: {
    ...mapActions("Posts", ["savePost"]),
    onSubmit() {
      this.loader = true;
      this.savePost({
        ...this.editedPost,
        id: this.$route.params.id,
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
  middleware:'auth',
};
</script>
