<template>
  <div class="intro"
  :style="`background-image: url('${cover}')`"
  >
    <b-container>
      <h1>{{ title }}</h1>
    </b-container>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    cover:{
        default: require('~/assets/images/news.jpg')
    }
  },
};
</script>
