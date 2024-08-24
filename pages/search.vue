<template>
  <div>
    <div>
      <div v-for="post in searchResults" class="flex flex-col space-y-4">
        <button
          class="hover:text-red-text text-4xl"
          @click="navigateToPost(post)">
          {{ post.title.rendered }}
        </button>
        <div v-html="post.content.rendered" class="line-clamp-3"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const route = useRoute();
const searchQuery = ref(route.query.search || "");

const searchResults = ref([]);

// Function to handle search logic
async function performSearch(query: string) {
  // Your search logic here, e.g., fetching search results based on the query
  if (!query) {
    navigateTo("/");
    return;
  }
  const { data } = await useFetch(
    `http://localhost/test-wp/wp-json/wp/v2/posts?`,
    {
      query: { search: query },
    }
  );
  // Update your search results accordingly
  searchResults.value = data.value;
  console.log(searchResults.value);
}

// Watch the query parameter for changes
watch(
  () => route.query.search,
  (newSearch) => {
    searchQuery.value = newSearch;
    performSearch(newSearch);
  }
);
performSearch(searchQuery.value);

function navigateToPost(post: object) {
  navigateTo(`/${post.slug}`);
}
</script>

<style scoped>
:deep() {
  @apply space-y-6;
}
:deep(.line-clamp-3 img) {
  @apply block ml-auto mr-auto w-96 h-96;
}

:deep(.line-clamp-3 h1) {
  @apply text-4xl;
}

:deep(.line-clamp-3 a) {
  @apply hover:text-red-text underline;
}
</style>
