<template>
  <div class="h-screen w-screen max-w-screen bg-white">
    <div class="w-full bg-black text-white">
      <div
        class="container mx-auto w-11/12 px-2 py-4 lg:p-4 lg:w-3/4 flex flex-row justify-between items-center"
      >
        <NuxtLink to="/"
          ><h1 class="font-logo text-xl md:text-2xl lg:text-4xl">
            Jason's Blog
          </h1></NuxtLink
        >
        <div v-if="!loginState">
          <NuxtLink to="/login" class="hover:text-red-text duration-100">
            <img :src="Login" class="w-[22px] h-[22px] mx-auto mt-2" />
          </NuxtLink>
        </div>
        <div
          v-else
          class="flex flex-row space-x-1 md:space-x-2 lg:space-x-4 font-roboto text-xs md:text-sm lg:text-base items-center"
        >
          <div>
            <NuxtLink to="/store" class="hover:text-red-text duration-100">
              <img :src="Store" class="w-6 h-6" />
            </NuxtLink>
          </div>
          <div class="flex gap-1 items-center">
            <div class="mt-1">{{ userBalance }}</div>
            <font-awesome :icon="faStar" class="text-[#FFDF00] text-[18px]" />
          </div>
          <div>
            <button class="hover:text-red-text duration-100" @click="logout">
              <img :src="Logout" class="w-[22px] h-[22px] mx-auto mt-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row w-full container mx-auto">
      <div class="w-1/4 p-6 space-y-4 hidden md:block"></div>
      <div
        class="w-full h-full p-6 font-roboto flex flex-col items-center justify-center space-y-6"
      >
        <div class="flex flex-col top-2 md:hidden w-1/2">
          <input
            type="text"
            v-model="search"
            placeholder="Search title"
            class="border-b-2 h-12 p-2"
            @keyup.enter="navigateToSearch"
          />
          <button
            class="border-2 px-2 py-1 bg-black text-white rounded-md my-2"
            @click="navigateToSearch"
          >
            <img :src="Search" class="w-4 h-4 mx-auto" />
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
              @keyup.enter="navigateToSearch"
            />
            <button
              class="border-2 px-4 py-2 bg-black text-white rounded-md my-2"
              @click="navigateToSearch"
            >
              <img :src="Search" class="w-5 h-5 mx-auto" />
            </button>
          </div>
          <div>
            <div class="bg-white shadow-md rounded-md overflow-hidden w-full">
              <div class="bg-black text-white text-center py-2">
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
                      v-for="(post, index) in topPosts.data"
                      :key="index"
                      class="border-t"
                    >
                      <td class="py-1">{{ index + 1 }}</td>
                      <td class="py-1">
                        <button
                          @click="navigateToPost(post.slug)"
                          class="w-full px-2 text-left line-clamp-1 hover:text-red-text hover:underline focus:outline-none"
                          :title="post.title"
                        >
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
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Store from "~/assets/image/store.png";
import Search from "~/assets/image/search.png";
import Logout from "~/assets/image/logout.png";
import Login from "~/assets/image/login.png";
import { useRequestHeaders, useFetch } from "#imports";
import { usePostToken } from "~/stores/usePostToken";
import { useLoginState } from "~/stores/useLoginState";
const config = useRuntimeConfig();
const route = useRoute();
const search = ref("");
const fullPath = computed(() => route.fullPath);
const { userBalance, setUserBalance } = usePostToken();
const { loginState } = useLoginState();

const { data: topPosts } = await useFetch("/api/get_top_views_posts", {
  watch: [fullPath],
  immediate: true,
});

function navigateToSearch() {
  if (search.value === "") {
    navigateTo("/");
    return;
  }
  return navigateTo({
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
