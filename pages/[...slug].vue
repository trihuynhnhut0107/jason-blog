<template>
  <div>
    <PostUnlockConfirmation
      v-model:popupActive="pucharsingPopupActive"
      v-model:purchasingPost="confirmPurchasingPost"
      v-model:currentPost="currentPost" />
    <div v-if="postData.length === 0">Loading...</div>
    <div v-else>
      <div class="space-y-6">
        <h1 class="font-oswald">{{ postData.post.post_title }}</h1>
        <h5>
          {{
            new Date(postData.post.post_date).toLocaleDateString(
              "en-US",
              options
            )
          }}
        </h5>
        <div :class="`${!postData.has_access ? 'fade-effect' : ''}`">
          <div v-html="postData.post.post_content"></div>
        </div>
        <div
          v-if="!postData.has_access"
          class="flex flex-row items-center justify-center">
          <button
            @click="showPurchasingDialog(postData.post.ID)"
            class="text-black border-2 px-4 py-2 shadow-md rounded-md hover:bg-black hover:text-white hover:shadow-xl duration-75">
            Unlock?
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const route = useRoute();
const slug = ref("");
const postData = ref([]);
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
  const data = await $fetch(`/api/posts`, { params: { slug: slug.value } });

  postData.value = data.data;
} catch (err) {
  // error.value = err.message;
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
