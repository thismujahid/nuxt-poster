<template>
    <div class="posts">
      <PageHeader title="All posts" :cover="require('assets/images/news.jpg')" />
      <PostsList :posts="posts" />
    </div>
  </template>
  <script>
  import PageHeader from "~/components/PageHeader.vue";
  import PostsList from "~/components/PostsList.vue";
  import {mapGetters} from "vuex"
  export default {
    components: { PageHeader, PostsList },
    computed: {
      ...mapGetters("Posts", ["posts"]),
    },
  };
  </script>
  