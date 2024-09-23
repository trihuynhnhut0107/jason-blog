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
      <p
        :class="{ invisible: !isLoginError }"
        class="text-red-text bg-red-200 px-4 py-2 rounded-md duration-75">
        {{ loginError }}!
      </p>
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

watch(
  () => loginData.value,
  (newLoginData: LoginData) => {
    isLoginError.value = false;
  },
  { deep: true }
);

const loginError = ref("");
const isLoginError = ref(false);
watch(loginError, (newLoginError: string) => {
  if (newLoginError !== "" && newLoginError !== "Success") {
    isLoginError.value = true;
  } else {
    isLoginError.value = false;
  }
});

async function login() {
  loginError.value = await useLogin(loginData.value);
}
</script>

<style></style>
