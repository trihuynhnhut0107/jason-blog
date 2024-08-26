<template>
  <div>
    <PostUnlockConfirmation />
    <div v-if="!loading" class="flex flex-col">
      <div
        v-for="item in restrictedPostInfo.posts"
        class="flex flex-col space-y-4">
        <h1 class="text-4xl text-start font-oswald">
          {{ item.post.post_title }}
        </h1>
        <button
          :class="`${
            item.has_access
              ? ''
              : 'blur-md pointer-events-none cursor-not-allowed'
          } hover:text-red-text`"
          @click="navigateToPost(item)">
          <h5 class="text-start">
            {{
              new Date(item.post.post_date).toLocaleDateString("en-US", options)
            }}
          </h5>
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
const route = useRoute();
const router = useRouter();

const userCookie = useCookie("user");

const options = ref({
  year: "numeric",
  month: "long",
  day: "numeric",
});

const restrictedPostInfo = ref([]);

const loading = ref(false);

if (!userCookie.value) {
  navigateTo("/login");
}

const currentPageNumber = ref(1);

fetchPostByPage(1);
const totalPages = ref(0);
async function fetchPostByPage(pageNumber: number) {
  try {
    loading.value = true;
    const { data } = await useAPI("custom/v1/get-post-list", {
      credentials: "include",
      params: {
        per_page: 2,
        page: pageNumber,
      },
    });
    totalPages.value = data.value.total_pages;
    restrictedPostInfo.value = data.value;
    console.log(restrictedPostInfo.value);
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

const pucharsingPopupActive = ref(false);

function purchasingPost() {
  pucharsingPopupActive.value = true;
}
</script>

<style scoped>
:deep() {
  @apply space-y-6 text-start font-roboto;
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
