<template>
  <div>
    <PostUnlockConfirmation
      v-model:popupActive="purchasingPopupActive"
      v-model:purchasingPost="confirmPurchasingPost"
      v-model:currentPost="currentPost"
    />
    <div v-if="fetchPending === 'pending'">Loading...</div>
    <div v-else class="h-full w-full">
      <div>
        <NuxtImg
          :src="postData.data.featured_image"
          class="!w-full"
        />
      </div>
      <div class="space-y-6">
        <h1 class="font-oswald">{{ postData.data.post.post_title }}</h1>
        <h5>
          {{
            new Date(postData.data.post.post_date).toLocaleDateString(
              "en-US",
              dateOptions
            )
          }}
        </h5>
        <div :class="!postData.data.has_access ? 'fade-effect' : ''">
          <div v-html="postData.data.post.post_content"></div>
        </div>
        <div
          v-if="!postData.data.has_access"
          class="flex flex-row items-center justify-center"
        >
          <button
            @click="showPurchasingDialog(postData.data.post.ID)"
            class="text-black border-2 px-4 py-2 shadow-md rounded-md hover:bg-black hover:text-white hover:shadow-xl duration-75"
          >
            Unlock?
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useFetch } from "nuxt/app";

const route = useRoute();
const slug = route.params.slug || "home";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const purchasingPopupActive = ref(false);
const confirmPurchasingPost = ref(false);
const currentPost = ref(-1);

// Fetch post data with `useFetch`
const {
  data: postData,
  status: fetchPending,
  error: fetchError,
  refresh: refreshPostData,
} = await useFetch(`/api/posts`, {
  params: { slug },
  watch: [purchasingPopupActive],
});
function showPurchasingDialog(postProductID: number) {
  currentPost.value = postProductID;
  purchasingPopupActive.value = true;
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

.fade-effect {
  @apply h-48 overflow-hidden relative after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-16 after:bg-gradient-to-b after:from-transparent after:to-white;
}
</style>
