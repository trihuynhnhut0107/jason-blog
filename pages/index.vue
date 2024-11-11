<template>
  <div>
    <PostUnlockConfirmation
      v-model:popupActive="purchasingPopupActive"
      v-model:purchasingPost="confirmPurchasingPost"
      v-model:currentPost="currentPost"
    />

    <div
      v-if="data.data.posts && data.data.total_pages > 0 || status === 'pending'"
      class="flex flex-col"
    >
      <div
        v-for="item in data.data.posts"
        :key="item.id"
        class="flex flex-col space-y-4"
      >
        <button
          @click="navigateToPost(item)"
          :class="`${
            item.has_access ? '' : 'pointer-events-none cursor-not-allowed'
          } hover:text-red-text`"
        >
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
        class="flex flex-row items-center justify-center space-x-1 text-center"
      >
        Page:
        <input
          type="text"
          v-model="currentPageNumber"
          class="text-center w-12 border-2 p-1 m-1 rounded-md"
        />
        /
        {{ data.data.total_pages }}
      </div>
    </div>
    <div v-else>
      <h1>No available post</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useFetch } from "#app";

const options = ref({
  year: "numeric",
  month: "long",
  day: "numeric",
});

const currentPageNumber = ref(1);
const purchasingPopupActive = ref(false);
const confirmPurchasingPost = ref(false);
const currentPost = ref(-1);

const { data, status, error, refresh } = await useFetch("/api/get_post_list", {
  params: {
    per_page: 2,
    page: currentPageNumber,
  },
  credentials: "include",
  watch: [purchasingPopupActive],
});

function navigateToPost(post: object) {
  navigateTo(`/${post.post.post_name}`);
}

watch(purchasingPopupActive, async (newValue) => {
  if (newValue === false) {
    refresh();
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
