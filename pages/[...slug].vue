<template>
  <div>
    <div class="space-y-6">
      <h1 class="font-oswald">{{ postData[0].title.rendered }}</h1>
      <h5>
        {{ new Date(postData[0].date).toLocaleDateString("en-US", options) }}
      </h5>
      <div v-html="postData[0].content.rendered"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const route = useRoute();
const slug = ref("");
const postData = ref([])
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

const options = ref({
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});


try {
    const data = await $fetch('/api/posts', {
      params: { slug: slug.value },
    })
    postData.value = data.data
  } catch (err) {
    error.value = err.message
  }
</script>

<style scoped>
:deep() {
  @apply space-y-6;
}
:deep(h1) {
  @apply text-4xl;
}
:deep(p) {
  @apply font-roboto;
}
:deep(img) {
  @apply block ml-auto mr-auto w-96 h-96;
}
:deep(a) {
  @apply hover:text-red-text underline;
}
</style>
