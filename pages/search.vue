<template>
  <div>
    <PostUnlockConfirmation
      v-model:popupActive="pucharsingPopupActive"
      v-model:purchasingPost="confirmPurchasingPost"
      v-model:currentPost="currentPost" />
    <div v-if="!loading" class="flex flex-col">
      <div v-if="totalPages !== 0">
        <div
          v-for="item in searchResults.posts"
          class="flex flex-col space-y-4">
          <button
            @click="navigateToPost(item)"
            :class="`${
              item.has_access ? '' : 'pointer-events-none cursor-not-allowed'
            } hover:text-red-text`">
            <h1 class="text-4xl text-start font-oswald">
              {{ item.post.post_title }}
            </h1>
          </button>
          <h5 class="text-start">
            {{
              new Date(item.post.post_date).toLocaleDateString("en-US")
            }}
          </h5>
          <button
            :class="`${
              item.has_access
                ? ''
                : 'blur-md pointer-events-none cursor-not-allowed'
            } hover:text-red-text`"
            @click="navigateToPost(item)">
            <div v-html="item.post.post_content" class="line-clamp-3"></div>
          </button>
          <div
            v-if="!item.has_access"
            class="flex flex-row items-center justify-center">
            <button
              @click="showPurchasingDialog(item.post.ID)"
              class="text-black border-2 px-4 py-2 shadow-md rounded-md hover:bg-black hover:text-white hover:shadow-xl duration-75">
              Unlock?
            </button>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center space-x-1 text-center">
          Page:
          <input
            type="text"
            v-model="currentPageNumber"
            class="text-center w-12 border-2 p-1 m-1 rounded-md" />
          /
          {{ totalPages }}
        </div>
      </div>
      <div v-else>
        <h1
          class="text-4xl font-roboto flex h-full w-full text-center items-center justify-center">
          No results found
        </h1>
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
    {
      searchQuery.value = newSearch;
      fetchPostByPage(newSearch, 1);
    }
  }
);
fetchPostByPage(searchQuery.value, 1);


const totalPages = ref(0);
async function fetchPostByPage(searchTerm: string, pageNumber: number) {
  if (searchTerm === "") {
    await navigateTo("/");
    return;
  }

  try {
    loading.value = true;
    const data = await $fetch("api/get_post_list", {
      headers: useRequestHeaders(),
      params: {
        per_page: 2,
        page: pageNumber,
        search: searchTerm,
      },
    });
    totalPages.value = data.data.total_pages;
    searchResults.value = data.data;
  } catch (error) {
    console.error(error);
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
      fetchPostByPage(searchQuery.value, newPageNumber);
    }, 500);
  }
});

function navigateToPost(post: object) {
  navigateTo(`/${post.post.post_name}`);
}

const pucharsingPopupActive = ref(false);
const confirmPurchasingPost = ref(false);
const currentPost = ref(-1);

function showPurchasingDialog(post_productID: number) {
  currentPost.value = post_productID;
  pucharsingPopupActive.value = true;
}
</script>

<style scoped>
:deep() {
  @apply space-y-6 text-start;
}
:deep(.line-clamp-3 p) {
  @apply font-roboto;
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
