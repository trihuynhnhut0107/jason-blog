<template>
  <div
    class="h-full w-full flex flex-col items-center justify-center space-y-4">
    <div class="flex flex-col w-1/4">
      <label for="username">Username</label>
      <input
        type="text"
        class="border-b-2 focus:outline-none focus:border-black"
        v-model="loginData.username"
        @keyup.enter="login" />
    </div>
    <div class="flex flex-col w-1/4">
      <label for="password">Password</label>
      <input
        type="password"
        class="border-b-2 focus:outline-none focus:border-black"
        v-model="loginData.password"
        @keyup.enter="login" />
    </div>
    <div>
      <button class="px-4 py-2 border-b-2 hover:text-red-text" @click="login">
        Submit
      </button>
    </div>
    <div class="flex flex-row space-x-1">
      <p>Don't have account?</p>
      <NuxtLink to="/signup"
        ><p class="underline hover:text-red-text">Sign up</p></NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "blank",
});

interface LoginData {
  username: string;
  password: string;
}

const userCookie = useCookie("user");

const loginData = ref({
  username: "",
  password: "",
});

async function login() {
  useLogin(loginData.value);
}
</script>

<style></style>
