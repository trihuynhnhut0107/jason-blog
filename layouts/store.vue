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
      <div class="w-1/4 p-6 space-y-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const leftSectionItemCount = ref(5);
const router = useRouter();
const route = useRoute();

const userCookie = useCookie("user");

const { data: tokenInfo } = await useAPI("custom/v1/get-token", {
  credentials: "include",
});

function logout() {
  userCookie.value = null;
  navigateTo("/login");
}
</script>

<style scoped>
::selection {
  color: white;
  background: black;
}
</style>
