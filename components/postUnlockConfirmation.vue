<template>
  <div
    v-if="popupActive"
    class="fixed inset-0 w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div
      class="w-1/4 h-1/6 bg-white ml-auto mr-auto flex flex-col items-center justify-center rounded-lg">
      <h3>Confirm unlocking this blog?</h3>
      <div class="flex flex-row items-center justify-center">
        <button
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
const popupActive = defineModel();

function cancelPurcharsing() {
  popupActive.value = false;
}
</script>

<style></style>
