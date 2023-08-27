<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <h5 class="m-0">Post preview</h5>
      <b-button to="/admin/posts" variant="primary"> Back </b-button>
    </div>
    <hr />
    <ViewPost :post="post" :preview="true" />
  </div>
</template>
<script>
import ViewPost from "~/components/ViewPost.vue";
import {mapGetters} from "vuex"
export default {
  components: {
    ViewPost,
  },
  asyncData(context) {
   return context.store.dispatch("Posts/loadPostDetails", context.params.id)
  },
  computed:{
     ...mapGetters("Posts", ['post'])
  },
  middleware:'auth',

};
</script>
