<template>
  <div>
    <PostUnlockConfirmation
      v-model:popupActive="pucharsingPopupActive"
      v-model:purchasingPost="confirmPurchasingPost"
      v-model:currentPost="currentPost" />

    <div v-if="restrictedPostInfo && totalPages > 0" class="flex flex-col">
      <div
        v-for="item in restrictedPostInfo.posts"
        class="flex flex-col space-y-4">
        <button
          @click="navigateToPost(item)"
          :class="`${
            item.has_access ? '' : 'pointer-events-none cursor-not-allowed'
          } hover:text-red-text`">
          <h1 class="text-4xl text-start font-oswald">
            {{ item.post.post_title }}
          </h1>
          <h5 class="text-start">
            {{
              new Date(item.post.post_date).toLocaleDateString("en-US", options)
            }}
          </h5>
          <div v-html="item.post.post_content" class="line-clamp-3"></div>
        </button>
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
      <h1>No available post</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
const options = ref({
  year: "numeric",
  month: "long",
  day: "numeric",
});

const restrictedPostInfo = ref([]);

const loading = ref(false);

const currentPageNumber = ref(1);

const totalPages = ref(0);
const slug = ref("");
const postData = ref([]);

async function fetchPostByPage(pageNumber: number) {
  try {
    loading.value = true;
    const { data } = await $fetch("/api/get_post_list", {
      credentials: "include",
      params: {
        per_page: 2,
        page: pageNumber,
      },
    });
    totalPages.value = data.total_pages;
    restrictedPostInfo.value = data;
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
});

function navigateToPost(post: object) {
  navigateTo(`/${post.post.post_name}`);
}

const pucharsingPopupActive = ref(false);
const confirmPurchasingPost = ref(false);
const currentPost = ref(-1);

async function showPurchasingDialog(post_productID: number) {
  currentPost.value = post_productID;
  pucharsingPopupActive.value = true;
  if (!confirmPurchasingPost.value && !pucharsingPopupActive.value) {
    await refreshNuxtData();
  }
}
fetchPostByPage(1);
watch(pucharsingPopupActive, async (newValue) => {
  if (newValue === false) {
    await fetchPostByPage(currentPageNumber.value);
  }
});
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
