<template>
  <div class="posts">
    <b-container>
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="m-0">My posts ({{posts?posts.length:0}} post)</h5>
        <b-button to="/admin/posts/create" variant="primary">
          Add new post
        </b-button>
      </div>
      <hr />
    </b-container>
    <PostsList :count-in-row="3" :is-admin="true" :posts="posts" />
  </div>
</template>
<script>
import PageHeader from "~/components/PageHeader.vue";
import PostsList from "~/components/PostsList.vue";
import { mapGetters } from "vuex";
export default {
  components: { PageHeader, PostsList },
  computed: {
    ...mapGetters("Posts", ["posts"]),
  },
  middleware:'auth',

};
</script>
