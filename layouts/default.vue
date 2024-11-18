<template>
  <div class="h-screen w-screen max-w-screen bg-white">
    <div class="w-full bg-black text-white">
      <div
        class="container mx-auto w-11/12 px-2 py-4 lg:p-4 lg:w-3/4 flex flex-row justify-between items-center">
        <NuxtLink to="/"
          ><h1 class="font-logo text-xl md:text-2xl lg:text-4xl">
            Jason's Blog
          </h1></NuxtLink
        >
        <div
          class="flex flex-row space-x-1 md:space-x-2 lg:space-x-4 font-roboto text-xs md:text-sm lg:text-base">
          <div>
            <NuxtLink to="/store" class="hover:text-red-text duration-100"
              >Store</NuxtLink
            >
          </div>
          <div>Token: {{ token }}</div>
          <div>
            <button class="hover:text-red-text duration-100" @click="logout">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row w-full container mx-auto">
      <div class="w-1/4 p-6 space-y-4 hidden md:block"></div>
      <div
        class="w-full h-full p-6 font-roboto flex flex-col items-center justify-center space-y-6">
        <div class="flex flex-col top-2 md:hidden w-1/2">
          <input
            type="text"
            v-model="search"
            placeholder="Search title"
            class="border-b-2 h-12 p-2"
            @keyup.enter="navigateToSearch" />
          <button
            class="border-2 px-2 py-1 bg-black text-white rounded-md my-2"
            @click="navigateToSearch">
            Search
          </button>
        </div>
        <div class="w-2/3 md:w-full h-full">
          <slot />
        </div>
      </div>
      <div class="w-1/4 py-6 md:flex md:flex-col hidden">
        <div class="sticky top-2 space-y-4">
          <div class="flex flex-col">
            <input
              type="text"
              v-model="search"
              placeholder="Search title"
              class="border-b-2 h-12 p-2"
              @keyup.enter="navigateToSearch" />
            <button
              class="border-2 px-4 py-2 hover:bg-black hover:text-white rounded-md my-2"
              @click="navigateToSearch">
              Search
            </button>
          </div>
          <div>
            <div class="bg-white shadow-md rounded-md overflow-hidden w-full">
              <div class="bg-gray-800 text-white text-center py-2">
                <h2 class="text-md font-medium">Top Posts</h2>
              </div>
              <div class="p-2">
                <table class="w-full text-center">
                  <thead>
                    <tr class="text-gray-600 text-xs uppercase">
                      <th class="p-1">#</th>
                      <th class="p-1">Title</th>
                      <th class="p-1">Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(post, index) in topViewedPosts"
                      :key="index"
                      class="border-t">
                      <td class="py-1">{{ index + 1 }}</td>
                      <td class="py-1">
                        <button
                          @click="navigateToPost(post.slug)"
                          class="w-full px-2 text-left line-clamp-1 hover:text-red-text hover:underline focus:outline-none"
                          :title="post.title">
                          {{ post.title }}
                        </button>
                      </td>
                      <td class="py-1">{{ post.view_count }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const search = ref("");
const token = ref(0);
const fetchToken = async () => {
  try {
    const reponse = await $fetch("api/tokens/token", {
      credentials: "include",
    });
    return reponse.token;
  } catch (e) {
    console.log(e);
  }
};

const topViewedPosts = ref([]);

const fetchTopViewedPosts = async () => {
  const data = await $fetch(`/api/get_top_views_posts`);
  console.log("Data:::", data);
  topViewedPosts.value = data.data;
};

onMounted(async () => {
  token.value = await fetchToken();
  fetchTopViewedPosts();
});

watch(
  () => route.fullPath,
  async () => {
    await fetchTopViewedPosts();
    console.log(topViewedPosts.value);
  }
);

function navigateToSearch() {
  if (search.value === "") {
    navigateTo("/");
    return;
  }
  navigateTo({
    path: "/search",
    query: {
      search: search.value,
    },
  });
}

function navigateToPost(slug) {
  navigateTo(`/${slug}`);
}

function logout() {
  useLogout();
}
</script>

<style scoped>
:deep()::selection {
  color: white;
  background: black;
}
</style>
