<template>
  <div class="home-page">
    <PageHeader title="Get the latest tech news" />
    <PostsList :posts="posts" />
  </div>
</template>

<script>
import PageHeader from "~/components/PageHeader.vue";
import PostsList from "~/components/PostsList.vue";
import { mapGetters } from "vuex";

export default {
  name: "IndexPage",
  data() {
    return {
      id: 5,
    };
  },
  computed: {
    ...mapGetters("Posts", ["posts"]),
  },

  components: { PageHeader, PostsList },

};
</script>
