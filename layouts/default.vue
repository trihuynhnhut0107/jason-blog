<template>
  <div class="h-screen max-w-screen bg-white">
    <div class="header w-full bg-black text-white">
      <div
        class="container mx-auto w-11/12 px-2 py-4 lg:p-4 lg:w-2/3 flex flex-row justify-between items-center">
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
        <div class="flex flex-col sticky top-2 md:hidden w-1/2">
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
      <div class="w-1/4 p-6 space-y-4 hidden md:block">
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

onMounted(async () => {
  token.value = await fetchToken();
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
