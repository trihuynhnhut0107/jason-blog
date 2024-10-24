<template>
  <div
    v-if="popupActive"
    class="fixed inset-0 w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div
      class="w-1/4 h-1/6 bg-white ml-auto mr-auto flex flex-col items-center justify-center rounded-lg">
      <h3>Confirm unlocking this blog?</h3>
      <div class="flex flex-row items-center justify-center">
        <button
          @click="unlockPost(currentPost)"
          class="text-black border-2 px-4 py-2 shadow-md rounded-md hover:bg-black hover:text-white hover:shadow-xl duration-75">
          Unlock
        </button>
        <button
          @click="cancelPurcharsing"
          class="text-black border-2 px-4 py-2 shadow-md rounded-md hover:bg-black hover:text-white hover:shadow-xl duration-75">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();

const popupActive = defineModel("popupActive");
const purchasingPost = defineModel("purchasingPost");
const currentPost = defineModel("currentPost");

async function unlockPost(postID: number) {
  purchasingPost.value = true;

  if (postID !== -1) {
    try {
      const buyPostInfo = await $fetch("api/buypost", {
        method: "POST",
        credentials: "include",
        body: {
          post_id: postID, // Automatically stringified by $fetch
        },
      });

    } catch (err) {
      alert(err);
    } finally {
      purchasingPost.value = false;
      popupActive.value = false;
    }
  } else {
    popupActive.value = false;
    alert("Post ID is not valid");
  }
}


function cancelPurcharsing() {
  popupActive.value = false;
}
</script>

<style></style>
