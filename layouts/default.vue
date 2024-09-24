<template>
  <div class="h-screen max-w-screen bg-white">
    <div class="header w-full bg-black text-white">
      <div
        class="container mx-auto w-2/3 flex flex-row justify-between py-4 px-4 items-center">
        <NuxtLink to="/"
          ><h1 class="font-logo text-4xl">Jason's Blog</h1></NuxtLink
        >
        <div class="flex flex-row space-x-4">
          <div>Token: {{ tokenInfo.token }}</div>
          <div>
            <NuxtLink to="/store" class="hover:text-red-text duration-100"
              >Store</NuxtLink
            >
          </div>
          <div>
            <button class="hover:text-red-text duration-100" @click="logout">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row w-full container mx-auto divide-x-2">
      <div class="w-1/4 h-full">
        <div v-for="item in leftSectionItemCount">
          <button class="items-center px-4 py-2 duration-100">
            <img
              src="\public\image\steal-10th_3D-600x679.jpg"
              alt="Book image" />
            Book number: {{ item }}
          </button>
        </div>
      </div>
      <div class="w-full h-full p-6"><slot /></div>
      <div class="w-1/4 p-6 space-y-4">
        <div class="flex flex-col sticky top-2">
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
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const leftSectionItemCount = ref(5);
const router = useRouter();
const route = useRoute();

const search = ref("");

const { data: tokenInfo } = await useAPI("custom/v1/get-token", {
  credentials: "include",
});

console.log(tokenInfo.value);

function navigateToSearch() {
  navigateTo({
    path: "/search",
    query: {
      search: search.value,
    },
  });
}

function logout() {
  useLogout();
  refreshNuxtData();
}
</script>

<style scoped>
::selection {
  color: white;
  background: black;
}
</style>
