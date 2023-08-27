<template>
  <b-container>
    <section class="my-3 featured-posts" :class="`count-in-row-${countInRow}`">
      <PostCard
        v-for="post in posts"
        :key="post.id + _uid"
        :post="post"
        :is-admin="isAdmin"
      />
    </section>
    <p v-if="!posts || posts.length === 0" class="text-center">
      No posts yet, contact an admin or login and add one
    </p>
  </b-container>
</template>
<script>
import PostCard from "./PostCard.vue";

export default {
  components: { PostCard },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: Array,
      default: [],
    },
    countInRow: {
      type: Number,
      default: 4,
    },
  },
};
</script>
