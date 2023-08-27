<template>
  <nuxt-link
    :to="isAdmin ? `/admin/posts/preview/${post.id}` : `/posts/${post.id}`"
    class="post-card"
  >
    <b-overlay @click.prevent style="position: unset !important" tag="span" :show="loader">
      <template #overlay>
        <div class="text-nowrap">
          <b-spinner small variant="danger" class="mx-1" /> Deleting the post...
        </div>
      </template>
      <article>
        <div
          class="post-thumbnail"
          :style="`background-image: url('${
            post.image || require('~/assets/images/ai.webp')
          }'`"
        ></div>
        <div class="body">
          <h2 class="title">{{ post.title }}</h2>
          <p class="prev">{{ post.prev }}</p>
        </div>
        <div
          v-if="isAdmin"
          class="d-flex align-items-center justify-content-center py-1 border-top border-dark actions"
        >
          <b-button
            class="mx-1"
            @click.prevent="$router.push(`/admin/posts/edit/${post.id}`)"
            variant="outline-primary"
            size="sm"
          >
            Edit
          </b-button>
          <b-button
            class="mx-1"
            :variant="deleteconfirm?'danger':'outline-primary'"
            size="sm"
            @click.prevent="
              if (deleteconfirm) {
                loader = true;
                deletePost(post).catch((err) => {
                  loader = false;
                });
              }
              deleteconfirm = true;
            "
          >
            {{ deleteconfirm ? "Sure?" : loader ? "Deleting..." : "Delete" }}
          </b-button>
          <b-button
            class="mx-1"
            variant="outline-primary"
            size="sm"
            v-if="deleteconfirm"
            @click.prevent="deleteconfirm = false"
          >
            No
          </b-button>
        </div>
      </article>
    </b-overlay>
  </nuxt-link>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    post: {
      type: Object,
      default: {
        id: 2,
        title: "Post title",
        prev: "Preview text",
        image: require("~/assets/images/ai.webp"),
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loader: false,
      deleteconfirm: false,
      startDelete: false,
    };
  },
  methods: {
    ...mapActions("Posts", ["deletePost"]),
  },
};
</script>
