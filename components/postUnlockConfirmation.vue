<template>
  <div
    v-if="popupActive"
    class="fixed inset-0 w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center z-50"
  >
    <div
      v-if="step === 1"
      class="py-4 w-[360px] bg-white ml-auto mr-auto flex flex-col items-center justify-center rounded-lg"
    >
      <h3 class="text-xl font-bold">Confirm unlocking this blog?</h3>
      <div
        class="flex flex-row items-center justify-center gap-2 mt-4 text-white"
      >
        <button
          @click="unlockPost(currentPost)"
          class="bg-black text-white border-2 px-4 py-2 shadow-md rounded-md duration-75"
        >
          Unlock
        </button>
        <button
          @click="cancelPurcharsing"
          class="bg-black border-2 px-4 py-2 shadow-md rounded-md duration-75"
        >
          Cancel
        </button>
      </div>
    </div>
    <div
      v-else-if="step === 2"
      class="py-4 w-[360px] bg-white ml-auto mr-auto flex flex-col items-center justify-center rounded-lg"
    >
      <h3 class="text-xl font-bold">Please log in to unlock this post</h3>
      <div
        class="flex flex-row items-center justify-center gap-2 mt-4 text-white"
      >
        <button
          @click="redirectToLogin"
          class="bg-black text-white border-2 px-4 py-2 shadow-md rounded-md duration-75"
        >
          Login
        </button>
        <button
          @click="cancelPurcharsing"
          class="bg-black border-2 px-4 py-2 shadow-md rounded-md duration-75"
        >
          Cancel
        </button>
      </div>
    </div>
    <div
      v-else-if="step === 3"
      class="py-4 w-[360px] bg-white ml-auto mr-auto flex flex-col items-center justify-center rounded-lg"
    >
      <h3 class="text-xl font-bold">You do not have enough tokens?</h3>
      <div
        class="flex flex-row items-center justify-center gap-2 mt-4 text-white"
      >
        <button
          @click="redirectToStore"
          class="bg-black text-white border-2 px-4 py-2 shadow-md rounded-md duration-75"
        >
          Get more
        </button>
        <button
          @click="cancelPurcharsing"
          class="bg-black border-2 px-4 py-2 shadow-md rounded-md duration-75"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePostToken } from '~/stores/usePostToken';
import { useLoginState } from '~/stores/useLoginState';

const router = useRouter();

const popupActive = defineModel("popupActive");
const purchasingPost = defineModel("purchasingPost");
const currentPost = defineModel("currentPost");
const step = ref(1);
const {setPostToken} = usePostToken()
async function unlockPost(postID: number) {
  purchasingPost.value = true;
  
  if (postID !== -1) {
    try {
      const buyPostInfo = await $fetch("api/buypost", {
        method: "POST",
        credentials: "include",
        body: {
          post_id: postID,
        },
      });
      // if(buyPostInfo.data.purchased === true) {
      //   await reloadNuxtApp()
      // }
    } catch (err) {
      const message =
        err?.data?.message || err?.message || "An unexpected error occurred";
      if (message === "User are not logged in") {
        step.value = 2;
      }
      if (
        message === "No tokens available" ||
        message === "Insufficient tokens"
      ) {
        step.value = 3;
      }
    } finally {
      // purchasingPost.value = false;
      // popupActive.value = false;
    }
  } else {
    popupActive.value = false;
    alert("Post ID is not valid");
  }
}

async function redirectToLogin() {
  await navigateTo("/login");
}

async function redirectToStore() {
  await navigateTo("/store")
}



function cancelPurcharsing() {
  popupActive.value = false;
}
</script>

<style></style>
