<template>
  <div class="h-screen max-w-screen bg-white">
    <div class="header w-full bg-black text-white">
      <div
        class="container mx-auto w-2/3 flex flex-row justify-between py-4 px-4 items-center">
        <NuxtLink to="/"
          ><h1 class="font-logo text-4xl">Jason's Blog</h1></NuxtLink
        >
        <div class="flex flex-row space-x-4 font-roboto">
          <div>Token: {{ tokenInfo.token }}</div>
          <div>
            <button class="hover:text-red-text duration-100" @click="logout">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row w-full container mx-auto">
      <div class="w-1/4 p-6 space-y-4"></div>
      <div class="w-full h-full p-6 font-roboto"><slot /></div>
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
const search = ref("");
const { data: tokenInfo } = await useAPI("custom/v1/get-token", {
  credentials: "include",
});
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

function logout() {
  useLogout();
}
</script>

<style scoped>
::selection {
  color: white;
  background: black;
}
</style>
