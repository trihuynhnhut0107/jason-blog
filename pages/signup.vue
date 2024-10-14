<template>
  <div
    class="h-full w-full flex flex-col items-center justify-center space-y-4">
    <div class="flex flex-col w-1/4">
      <label for="email">Email</label>
      <input
        type="email"
        class="border-b-2 focus:outline-none focus:border-black"
        v-model="signupData.email" />
    </div>
    <div class="flex flex-col w-1/4">
      <label for="username">Username</label>
      <input
        type="text"
        class="border-b-2 focus:outline-none focus:border-black"
        v-model="signupData.username" />
    </div>
    <div class="flex flex-col w-1/4">
      <label for="password">Password</label>
      <input
        type="password"
        class="border-b-2 focus:outline-none focus:border-black"
        v-model="signupData.password" />
    </div>
    <div>
      <p
        :class="{ invisible: !isSignupError }"
        class="text-red-text bg-red-200 px-4 py-2 rounded-md duration-75">
        {{ signupError }}!
      </p>
    </div>
    <div>
      <button class="px-4 py-2 border-b-2 hover:text-red-text" @click="submit">
        Submit
      </button>
    </div>
    <div class="flex flex-row space-x-1">
      <p>Already have an account?</p>
      <NuxtLink to="/login" class="underline hover:text-red-text"
        >Log in?</NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "blank",
});

const signupData = ref({
  email: "",
  username: "",
  password: "",
});

const signupError = ref("");
const isSignupError = ref(false);
watch(signupError, (newSignupError: string) => {
  if (newSignupError !== "" && newSignupError !== "Success") {
    isSignupError.value = true;
  } else {
    isSignupError.value = false;
  }
});

async function submit() {
  try {
  const signupResponse = await $fetch("api/authentication/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: signupData.value.email,
      username: signupData.value.username,
      password: signupData.value.password,
    }),
  });

 
  if (signupResponse?.statusCode === 200) {
    await useLogin({
      username: signupData.value.username,
      password: signupData.value.password,
    });
  }
} catch (error) {
  signupError.value = error?.data?.message || "An unexpected error occurred";
}
}
</script>

<style></style>
