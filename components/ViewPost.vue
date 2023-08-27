<template>
  <div class="single-post">
    <b-container>
      <div class="post pt-2">
        <h4 v-if="!preview">{{ post.title }}</h4>
        <div class="details">
          <img :src="post.image" v-if="post.image && preview" width="100%">
          <div>
            <strong> Last updated on: </strong>
            {{ post.created_at|d }}
          </div>
          <div>
            <strong> Written by: </strong>

            {{ post.created_by }}
          </div>
        </div>
        <hr />
        <p>{{ post.content }}</p>
        <hr />
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: {},
    },
    preview: {
      type: Boolean,
      default: false,
    },

  },
};
</script>
