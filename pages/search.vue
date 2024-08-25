<template>
  <div>
    <div v-if="!loading">
      <div v-for="item in searchResults.posts" class="flex flex-col space-y-4">
        <button
          :class="`${
            item.has_access
              ? ''
              : 'opacity-50 pointer-events-none cursor-not-allowed'
          } hover:text-red-text`"
          @click="navigateToPost(item)">
          <h1 class="text-4xl">{{ item.post.post_title }}</h1>
          <div v-html="item.post.post_content" class="line-clamp-3"></div>
        </button>
        <div
          v-if="!item.has_access"
          class="flex flex-row items-center justify-center">
          <button
            class="text-black border-2 px-4 py-2 shadow-md rounded-md hover:bg-black hover:text-white hover:shadow-xl duration-75">
            Unlock?
          </button>
        </div>
      </div>
      <div class="flex flex-row items-center justify-center">
        <div class="flex flex-row items-center justify-center">
          Page:
          <input
            type="text"
            v-model="currentPageNumber"
            class="text-center w-12 border-2 m-2 rounded-md" />
          /
          {{ totalPages }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const route = useRoute();
const searchQuery = ref(route.query.search || "");

const searchResults = ref([]);

const loading = ref(false);

const currentPageNumber = ref(1);

// Watch the query parameter for changes
watch(
  () => route.query.search,
  (newSearch) => {
    searchQuery.value = newSearch;
    fetchPostByPage(newSearch, 1);
  }
);
fetchPostByPage(searchQuery.value, 1);

const totalPages = ref(0);
async function fetchPostByPage(searchTerm: string, pageNumber: number) {
  if (searchTerm === "") {
    navigateTo("/");
  }
  try {
    loading.value = true;
    const { data } = await useAPI("custom/v1/get-post-list", {
      credentials: "include",
      params: {
        per_page: 2,
        page: pageNumber,
        search: searchTerm,
      },
    });
    totalPages.value = data.value.total_pages;
    searchResults.value = data.value;
    console.log(searchResults.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

watch(currentPageNumber, (newPageNumber) => {
  if (newPageNumber === null) {
  }
  if (newPageNumber <= totalPages.value && newPageNumber > 0) {
    currentPageNumber.value = newPageNumber;
    setTimeout(function () {
      fetchPostByPage(newPageNumber);
    }, 500);
  }
  console.log(newPageNumber);
});

function navigateToPost(post: object) {
  navigateTo(`/${post.post.post_name}`);
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
