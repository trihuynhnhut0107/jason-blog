<template>
  <div class="text-4xl font-oswald">Store</div>
  <div class="flex flex-row justify-center items-center h-full w-full">
    <div class="flex flex-col p-2 h-full w-full">
      <div
        class="relative w-full h-full border rounded-md flex flex-col items-center justify-center">
        <h1
          class="flex justify-center items-center font-logo text-5xl h-24 w-24 pointer-events-none cursor-not-allowed">
          Token
        </h1>

        <div
          class="absolute inset-0 bg-black bg-opacity-75 space-x-1 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div class="flex flex-row font-oswald">
            <button
              class="border bg-white px-1 hover:bg-red-text hover:text-white"
              @click="itemQuantity--">
              <p>-</p>
            </button>
            <input
              type="text"
              class="text-center mx-auto focus:outline-none"
              v-model="itemQuantity" />
            <button
              class="border bg-white px-1 hover:bg-red-text hover:text-white"
              @click="itemQuantity++">
              <p>+</p>
            </button>
          </div>
          <div>
            <button
              @click="purchaseItem"
              class="bg-white shadow-md rounded-md m-2 px-4 py-2 hover:bg-red-text hover:text-white duration-75 font-oswald">
              Purchase
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <p>Token</p>
        <p>Price: {{ tokenPrice }} VNĐ</p>
        <p>Total: {{ tokenPrice *  itemQuantity}} VNĐ</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePostToken } from '~/stores/usePostToken';
definePageMeta({
  layout: "store",
});
const {userBalance, postToken} = usePostToken()
const itemQuantity = ref(postToken - userBalance > 0 ? postToken - userBalance : 0);

const tokenPrice = ref(10000);

function purchaseItem() {
  const tokenQuantityCookie = useCookie("tokenQuantity");
  tokenQuantityCookie.value = String(itemQuantity.value);
  navigateTo("/payment");
  return;
}
</script>

<style></style>
