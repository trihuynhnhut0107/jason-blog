<template>
  <div>
    <div class="space-y-6">
      <h1>{{ postData[0].title.rendered }}</h1>
      <div v-html="postData[0].content.rendered"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const route = useRoute();
const slug = ref("");

if (route.params.slug) {
  let lastIndex = route.params.slug.length - 1;
  if (!route.params.slug[lastIndex]) {
    slug.value = route.params.slug[lastIndex - 1];
  } else {
    slug.value = route.params.slug[lastIndex];
  }
} else {
  slug.value = "home";
}

const {
  data: postData,
  pending,
  error,
  refresh,
} = await useFetch("http://localhost/test-wp/wp-json/wp/v2/posts?", {
  query: { slug: slug.value },
});
console.log(postData.value);
</script>

<style scoped>
:deep() {
  @apply space-y-6;
}
:deep(h1) {
  @apply text-4xl;
}
:deep(img) {
  @apply block ml-auto mr-auto w-96 h-96;
}
:deep(a) {
  @apply hover:text-red-text underline;
}
</style>
