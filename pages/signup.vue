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
      <button class="px-4 py-2 border-b-2 hover:text-red-text" @click="submit">
        Submit
      </button>
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

async function submit() {
  const { data } = await useAPI("custom/v1/signup", {
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
  if (data.value.status === 200) {
    useLogin({
      username: signupData.value.username,
      password: signupData.value.password,
    });
  }
}
</script>

<style></style>
