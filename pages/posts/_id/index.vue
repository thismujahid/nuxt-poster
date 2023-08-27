<template>
  <div class="mb-4">
    <PageHeader :title="post.title" :cover="post.image" />
    <ViewPost :post="post" :preview="false" />
  </div>
</template>
<script>
import ViewPost from "@/components/ViewPost.vue";
import {mapGetters} from "vuex"
export default {
  components: {
    ViewPost,
  },
  computed:{
    ...mapGetters("Posts",['post'])
  },
  asyncData(context) {
   return context.store.dispatch("Posts/loadPostDetails", context.params.id)
  },
};
</script>
